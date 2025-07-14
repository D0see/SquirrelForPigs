import { sqlLeftJoin, sqlInnerJoin, sqlSelect, whereClause } from "../services/sqlFunctions.mjs";
import { sqlKeywords, sqlOperators, joinKeywords, nextCompositeKeyWordsWord, equivalentKeywords } from "../utils/keywords.mjs";
import { cleanQueryInput, tablesAliasesHandler, buildDescriptiveHeaders, turnRightJoinIntoLeftJoin, findEndIndexOfKeywordQuery, normalizeHeaders, findTableInTableArray, columnsHeadersAliasesHandler, applyHeadersAliases, applySqlJoinQuery } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tables) => {
    
    // parse subQueries "(query)" push the result table into tables and updates the input with the result table name
    input = handleSubQueries(sqlKeywords, input, tables);

    const words = cleanQueryInput(sqlKeywords, nextCompositeKeyWordsWord, equivalentKeywords, input);

    //saves aliases for selected columns, remove them form the query
    const selectedColumnsHeaderAliases = columnsHeadersAliasesHandler(sqlKeywords, words);

    //updates tables aliases in place and remove them for the query  
    tablesAliasesHandler(sqlKeywords, words, tables);

    //updates tables headers in place based on their aliases and names (table.Name : a, table.alias : b => header.a.b)
    buildDescriptiveHeaders(tables);

    //updates the query in place "table1 RIGHTJOIN table2 on table1.header = table2.header" => "table2 LEFTJOIN table1 on table2.header = table1.header"
    turnRightJoinIntoLeftJoin(sqlKeywords, words);

    //executes all joins in the query, updates the query with the new joined tables names and push them into tables
    parseAllJoins(sqlKeywords, words, tables)

    let finalTable = parseSelect(sqlKeywords, words, tables);

    finalTable = whereClause(sqlKeywords, sqlOperators, words, finalTable);

    //removes aliases and tablename from column headers
    normalizeHeaders(finalTable);

    applyHeadersAliases(finalTable, selectedColumnsHeaderAliases)

    return finalTable;
} 

const parseAllJoins = (sqlKeywords, words, tables) => {
    let currIntermediaryTable;
    for (let currIndex = 0; currIndex < words.length; currIndex++) {
        const word = words[currIndex];
        if (!joinKeywords[word]) continue;

        const endIndex = findEndIndexOfKeywordQuery(joinKeywords, words, currIndex);
        const query = words.slice(currIndex - 1, endIndex + 1);

        switch (word) {
            case sqlKeywords.LEFT_JOIN :
                currIntermediaryTable = applySqlJoinQuery(sqlLeftJoin, query, tables);      
                break;
            case sqlKeywords.INNER_JOIN :
                currIntermediaryTable = applySqlJoinQuery(sqlInnerJoin, query, tables);
                break;
        }

        tables.push(currIntermediaryTable);
        //updates query
        words.splice(currIndex - 1, endIndex + 2 - currIndex, currIntermediaryTable.tableName);
        currIndex--;
    }
}

const parseSelect = (sqlKeywords, words, tables) => {
    const selectIndex = words.findIndex(word => word === sqlKeywords.SELECT);
    if (selectIndex === -1) throw new Error(`missing ${sqlKeywords.SELECT} keyword"`);

    let lastElemIndex;
    for (const [index, word] of words.entries()) {
        if (word === sqlKeywords.FROM) {
            lastElemIndex = index;
        }
    }
    const selectedColumns = words.slice(selectIndex + 1, lastElemIndex);
    const selectedFromTable = findTableInTableArray(words[lastElemIndex + 1], tables);
    return sqlSelect(sqlKeywords, selectedColumns, selectedFromTable);
}

//For subqueries ("Select ... From (subquery)") we parse the input and call sql Parser on every query present between 2 parentheses
const handleSubQueries = (sqlKeywords, input, tables) => {
    const openPar = input.indexOf(sqlKeywords.SUBQUERY_START);

    const findCorrectClosingPar = (sqlKeywords, openPar, input) => {
        let subQueryCounter = 0;
        for (let i = openPar + 1; i < input.length; i++) {
            if (input[i] === sqlKeywords.SUBQUERY_START) {
                subQueryCounter++;
                continue;
            } else if (input[i] === sqlKeywords.SUBQUERY_END) {
                if (!subQueryCounter) return i;
                subQueryCounter--;
            }
        }
        return -1
    }

    const closedPar = findCorrectClosingPar(sqlKeywords, openPar, input);
    if (openPar === -1 || closedPar === -1) return input;

    const subQuery = input.slice(openPar + 1, closedPar);
    const subQueryResult = SqlParser(subQuery, tables);
    tables.push(subQueryResult);

    input = input.slice(0, openPar).concat(subQueryResult.tableName).concat(input.slice(closedPar + 1));
    input = handleSubQueries(sqlKeywords, input, tables);
    return input;
}