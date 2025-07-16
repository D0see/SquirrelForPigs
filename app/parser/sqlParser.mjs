import { sqlLeftJoin, sqlInnerJoin, sqlSelect, sqlWhereCompareColumnToColumn, sqlWhereCompareHeaderToString, sqlWhereCompareStringToString } from "./sql.logic/sqlFunctions.mjs";
import { sqlKeywords, sqlOperatorsJsEquivalent, joinKeywords, nextCompositeKeyWordsWord, equivalentKeywords, reservedKeyWords, dataTypes } from "../utils/keywords.mjs";
import { cleanQueryInput, tablesAliasesHandler, buildDescriptiveHeaders, turnRightJoinIntoLeftJoin, findEndIndexOfKeywordQuery, normalizeHeaders, findTableInTableArray, columnsHeadersAliasesHandler, applyHeadersAliases, paramIsStringRepresentation, findQueryEndSymbol } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tables) => {
    
    // parse subQueries "(query)" push the result table into tables and updates the input with the result table name
    input = parseSubQueries(sqlKeywords, input, tables);

    const [selectQuery, whereClause] = cleanQueryInput(sqlKeywords, nextCompositeKeyWordsWord, equivalentKeywords, input);

    //saves aliases for selected columns, remove them form the query
    const selectedColumnsHeaderAliases = columnsHeadersAliasesHandler(sqlKeywords, selectQuery);

    //updates tables aliases in place and remove them for the query  
    tablesAliasesHandler(sqlKeywords, reservedKeyWords, selectQuery, tables);

    //updates tables headers in place based on their aliases and names (table.Name : a, table.alias : b => header.a.b)
    buildDescriptiveHeaders(tables);

    //updates the query in place "table1 RIGHTJOIN table2 on table1.header = table2.header" => "table2 LEFTJOIN table1 on table2.header = table1.header"
    turnRightJoinIntoLeftJoin(sqlKeywords, selectQuery);

    //executes all joins in the query, updates the query with the new joined tables names and push them into tables
    parseAllJoins(sqlKeywords, selectQuery, tables)

    let finalTable = parseSelect(sqlKeywords, selectQuery, tables);

    finalTable = parseWhereClause(sqlKeywords, sqlOperatorsJsEquivalent, whereClause, finalTable);

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

const applySqlJoinQuery = (sqlJoinMethodCallback, query, tables) => {
    const table1 = findTableInTableArray(query[0], tables);
    let tablesWithoutTable1 = tables;
    if (table1.alias) {
        tablesWithoutTable1 = tables.filter(table => table.alias != table1.alias);
    }
    const table2 = findTableInTableArray(query[2], tablesWithoutTable1);
    const resultTable = sqlJoinMethodCallback(table1, table2, query[4], query[6], sqlOperatorsJsEquivalent, query[5]);
    return resultTable;
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
const parseSubQueries = (sqlKeywords, input, tables) => {
    const openPar = input.indexOf(sqlKeywords.SUBQUERY_START);

    const closedPar = findQueryEndSymbol(sqlKeywords, openPar, input);
    if (openPar === -1 || closedPar === -1) return input;

    const subQuery = input.slice(openPar + 1, closedPar);
    const subQueryResult = SqlParser(subQuery, tables);
    tables.push(subQueryResult);

    input = input.slice(0, openPar).concat(subQueryResult.tableName).concat(input.slice(closedPar + 1));
    input = parseSubQueries(sqlKeywords, input, tables);
    return input;
}

const parseWhereClause = (sqlKeywords, sqlOperatorsJsEquivalent, whereClauseWords, finalTable) => {
    if (!whereClauseWords.length) return finalTable;

    const parameters = {
        left : {
            val : whereClauseWords[1],
            type : 'header',
        },
        right : {
            val : whereClauseWords[3],
            type : 'header',
        },
    };
    if (sqlKeywords[parameters.left.val] || sqlKeywords[parameters.left.val]) throw new Error(`invalid names for values in ${sqlKeywords.WHERE} clause`);

    const operator = whereClauseWords[2];
    if (!sqlOperatorsJsEquivalent[operator]) throw new Error(`no operator found in ${sqlKeywords.WHERE} clause`);

    Object.values(parameters).forEach((parameter) => {
        if (paramIsStringRepresentation(parameter.val)) {
            parameter.type = 'string';
            parameter.val = parameter.val.slice(1, parameter.val.length -1);
        }
    });
    
    if (parameters.left.type === 'header' && parameters.right.type === 'header') {
        return sqlWhereCompareColumnToColumn(parameters.left.val, parameters.right.val, finalTable, sqlOperatorsJsEquivalent, operator, dataTypes);

    } else if (parameters.left.type === 'string' && parameters.right.type === 'string') {
        return sqlWhereCompareStringToString(parameters.left.val, parameters.right.val, finalTable, sqlOperatorsJsEquivalent, operator, dataTypes);

    } else {
        return sqlWhereCompareHeaderToString(
            (parameters.left.type === 'header' ? parameters.left.val : parameters.right.val), 
            (parameters.left.type === 'string' ? parameters.left.val : parameters.right.val), 
            finalTable, sqlOperatorsJsEquivalent, operator, dataTypes);
    }
}