import { sqlLeftJoin, sqlInnerJoin, sqlSelect } from "../services/sqlFunctions.mjs";
import { allKeywords, joinKeywords, nextCompositeKeyWordsWord, equivalentKeywords } from "../utils/keywords.mjs";
import { cleanQueryInput, tablesAliasesHandler, buildDescriptiveHeaders, turnRightJoinIntoLeftJoin, findEndIndexOfKeywordQuery, normalizeHeaders, findTableInTableArray, columnsHeadersAliasesHandler, applyHeadersAliases, applySqlJoinQuery } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tables) => {


    const inputArr = [input];

    //For subqueries ("Select ... From (subquery)") we parse the input and call sql Parser on every query present between 2 parentheses
    //TODO : MUST REFACTOR !!!
    const handleSubQueries = (inputArr, tables) => {
        const openPar = inputArr[0].indexOf('(');

        const findCorrectClosingPar = (openPar, inputArr) => {
            let subQueryCounter = 0;
            for (let i = openPar + 1; i < inputArr[0].length; i++) {
                if (inputArr[0][i] === '(') {
                    subQueryCounter++;
                    continue;
                } else if (inputArr[0][i] === ')') {
                    if (!subQueryCounter) return i;
                    subQueryCounter--;
                }
            }
            return -1
        }

        const closedPar = findCorrectClosingPar(openPar, inputArr);
        if (openPar === -1 || closedPar === -1) return inputArr[0];
        const subQuery = inputArr[0].slice(openPar + 1, closedPar);
        const subQueryResult = SqlParser(subQuery, tables);
        tables.push(subQueryResult);

        inputArr[0] = inputArr[0].slice(0, openPar).concat(subQueryResult.tableName).concat(inputArr[0].slice(closedPar + 1));
        inputArr[0] = handleSubQueries(inputArr, tables);
        return inputArr[0];
    }
    
    input = handleSubQueries(inputArr, tables);

    const words = cleanQueryInput(allKeywords, nextCompositeKeyWordsWord, equivalentKeywords, input);

    const selectedColumnsHeaderAliases = columnsHeadersAliasesHandler(words);

    //updates tables aliases in place and remove them for the query  
    tablesAliasesHandler(joinKeywords, words, tables);

    //updates tables headers in place based on their aliases and names (table.Name : a, table.alias : b => header.a.b)
    buildDescriptiveHeaders(tables);

    //updates the query in place "table1 RIGHTJOIN table2 on table1.header = table2.header" => "table2 LEFTJOIN table1 on table2.header = table1.header"
    turnRightJoinIntoLeftJoin(words);

    //executes all joins in the query, updates the query with the new joined tables names and push them into tables
    parseAllJoins(words, tables)

    const finalTable = parseSelect(words, tables);

    //removes aliases and tablename from column headers
    normalizeHeaders(finalTable);

    applyHeadersAliases(finalTable, selectedColumnsHeaderAliases)

    return finalTable;
} 

const parseAllJoins = (words, tables) => {
    let currIntermediaryTable;
    for (let currIndex = 0; currIndex < words.length; currIndex++) {
        const word = words[currIndex];
        if (!joinKeywords[word]) continue;

        const endIndex = findEndIndexOfKeywordQuery(joinKeywords, words, currIndex);
        const query = words.slice(currIndex - 1, endIndex + 1);

        switch (word) {
            case "LEFT JOIN":
                currIntermediaryTable = applySqlJoinQuery(sqlLeftJoin, query, tables);      
                break;
            case "INNER JOIN":
                currIntermediaryTable = applySqlJoinQuery(sqlInnerJoin, query, tables);
                break;
        }

        tables.push(currIntermediaryTable);
        //updates query
        words.splice(currIndex - 1, endIndex + 2 - currIndex, currIntermediaryTable.tableName);
        currIndex--;
    }
}

const parseSelect = (words, tables) => {
    const selectIndex = words.findIndex(word => word === 'SELECT');
    if (selectIndex === undefined) throw new Error("missing SELECT keyword");

    let lastElemIndex;
    for (const [index, word] of words.entries()) {
        if (word === 'FROM') {
            lastElemIndex = index;
        }
    }
    const selectedColumns = words.slice(selectIndex + 1, lastElemIndex);
    const selectedFromTable = findTableInTableArray(words[lastElemIndex + 1], tables);
    return sqlSelect(selectedColumns, selectedFromTable);
}