import { sqlLeftJoin, sqlInnerJoin, sqlFullJoin, sqlSelect, sqlWhereCompareColumnToColumn, sqlWhereCompareHeaderToString, sqlWhereCompareStringToString, sqlOrderBy } from "./sql.logic/sqlFunctions.mjs";
import { sqlConsts } from "../utils/sqlConsts.mjs";
import { cleanInput, splitQuery, tablesAliasesHandler, buildDescriptiveHeaders, turnRightJoinIntoLeftJoin, findEndIndexOfKeywordQuery, normalizeHeaders, findTableInTableArray, columnsHeadersAliasesHandler, applyHeadersAliases, paramIsDirectValueRepresentation, findQueryEndSymbol, validateQueries } from "./sqlParser.helper.mjs";

export const sqlParser = (input, tables) => {

    tables = JSON.parse(JSON.stringify(tables));
    
    // parse subQueries "(query)" push the result table into tables and updates the input with the result table name
    input = parseSubQueries(sqlConsts, input, tables);

    const query = cleanInput(sqlConsts, input);

    const [queryBody, whereClauses, orderByClause, limitClause] = splitQuery(sqlConsts, query);
    //saves aliases for selected columns, remove them from the query
    const selectedColumnsHeaderAliases = columnsHeadersAliasesHandler(sqlConsts, queryBody);

    //updates tables aliases in place and remove them for the query  
    tablesAliasesHandler(sqlConsts, queryBody, tables);
    
    //throws specific error if invalid
    validateQueries(sqlConsts, queryBody, whereClauses, orderByClause, limitClause);

    //updates tables headers in place based on their aliases and names (table.Name : a, table.alias : b => header.a.b)
    buildDescriptiveHeaders(tables);

    //updates the query in place "table1 RIGHTJOIN table2 on table1.header = table2.header" => "table2 LEFTJOIN table1 on table2.header = table1.header"
    turnRightJoinIntoLeftJoin(sqlConsts, queryBody);

    //executes all joins in the query, updates the query with the new joined tables names and push them into tables
    parseAllJoins(sqlConsts, queryBody, tables);

    //here query should look like => Select columnNames from finalTableName
    let finalTable = findTableInTableArray(sqlConsts, queryBody[queryBody.length - 1], tables);

    whereClauses.forEach(whereClause => {
        finalTable = parseWhereClause(sqlConsts, whereClause, finalTable);
    })

    finalTable = parseOrderByClause(sqlConsts, orderByClause, finalTable);

    finalTable = parseLimitClause(limitClause, finalTable);
    
    finalTable = parseSelect(sqlConsts, queryBody, tables);

    //removes aliases and tablename from column headers
    normalizeHeaders(finalTable);

    applyHeadersAliases(finalTable, selectedColumnsHeaderAliases)
    return finalTable;
} 

const parseAllJoins = (sqlConsts, words, tables) => {
    const { sqlKeywords, joinKeywords, dataTypes } = sqlConsts;
    let currIntermediaryTable;
    for (let currIndex = 0; currIndex < words.length; currIndex++) {
        const word = words[currIndex];
        if (!joinKeywords[word]) continue;

        const endIndex = findEndIndexOfKeywordQuery(joinKeywords, words, currIndex);
        const query = words.slice(currIndex - 1, endIndex + 1);

        switch (word) {
            case sqlKeywords.LEFT_JOIN :
                currIntermediaryTable = applySqlJoinQuery(sqlConsts, dataTypes, sqlLeftJoin, query, tables);      
                break;
            case sqlKeywords.INNER_JOIN :
                currIntermediaryTable = applySqlJoinQuery(sqlConsts, dataTypes, sqlInnerJoin, query, tables);
                break;
            case sqlKeywords.FULL_JOIN :
                currIntermediaryTable = applySqlJoinQuery(sqlConsts, dataTypes, sqlFullJoin, query, tables);
                break;
        }
        tables.push(currIntermediaryTable);
        //updates query
        words.splice(currIndex - 1, endIndex + 2 - currIndex, currIntermediaryTable.tableName);
        currIndex--;
    }
}

const applySqlJoinQuery = (sqlConsts, dataTypes, sqlJoinMethodCallback, query, tables) => {
    const table1 = findTableInTableArray(sqlConsts, query[0], tables);
    let tablesWithoutTable1 = tables;
    if (table1.alias) {
        tablesWithoutTable1 = tables.filter(table => table.alias != table1.alias);
    }
    const table2 = findTableInTableArray(sqlConsts, query[2], tablesWithoutTable1);
    const resultTable = sqlJoinMethodCallback(sqlConsts, dataTypes, table1, table2, query[4], query[6], query[5]);
    return resultTable;
}

const parseSelect = (sqlConsts, words, tables) => {
    const { sqlKeywords, sqlErrors } = sqlConsts;

    const selectIndex = words.findIndex(word => word === sqlKeywords.SELECT);
    if (selectIndex === -1) throw sqlErrors.MISSING_KEYWORD(sqlKeywords.SELECT);

    let lastElemIndex;
    for (const [index, word] of words.entries()) {
        if (word === sqlKeywords.FROM) {
            lastElemIndex = index;
        }
    }
    const selectedColumns = words.slice(selectIndex + 1, lastElemIndex);
    const selectedFromTable = findTableInTableArray(sqlConsts, words[lastElemIndex + 1], tables);
    return sqlSelect(sqlConsts, selectedColumns, selectedFromTable);
}

//For subqueries ("Select ... From (subquery)") we parse the input and call sql Parser on every query present between 2 parentheses
const parseSubQueries = (sqlConsts, input, tables) => {
    const sqlKeywords = sqlConsts.sqlKeywords;

    const openPar = input.indexOf(sqlKeywords.SUBQUERY_START);

    const closedPar = findQueryEndSymbol(sqlKeywords, openPar, input);
    if (openPar === -1 || closedPar === -1) return input;

    const subQuery = input.slice(openPar + 1, closedPar);
    const subQueryResult = sqlParser(subQuery, tables);
    tables.push(subQueryResult);

    input = input.slice(0, openPar).concat(subQueryResult.tableName).concat(input.slice(closedPar + 1));
    input = parseSubQueries(sqlConsts, input, tables);
    return input;
}

const parseWhereClause = (sqlConsts, whereClauseWords, finalTable) => {
    const { sqlKeywords, sqlOperatorsJsEquivalent, dataTypes } = sqlConsts;

    if (!whereClauseWords.length) return finalTable;

    // Create a proper array and map instead of modifying in place
    const parameterValues = [
        { val: whereClauseWords[1], type: 'header', key: 'left' },
        { val: whereClauseWords[3], type: 'header', key: 'right' }
    ];

    // Fix the typo here
    if (sqlKeywords[parameterValues[0].val] || sqlKeywords[parameterValues[1].val]) {
        throw new Error(`invalid names for values in ${sqlKeywords.WHERE} clause`);
    }

    const operator = whereClauseWords[2];
    if (!sqlOperatorsJsEquivalent[operator]) {
        throw new Error(`no operator found in ${sqlKeywords.WHERE} clause`);
    }

    console.log(1, parameterValues[0].type, parameterValues[1].type)

    // Use map instead of forEach with mutation
    const processedParams = parameterValues.map(param => ({
        ...param,
        type: paramIsDirectValueRepresentation(sqlConsts, param.val) ? 'string' : param.type
    }));

    console.log(2, processedParams[0].type, processedParams[0].val, processedParams[1].type, processedParams[1].val)

    const [left, right] = processedParams;

    if (left.type === 'header' && right.type === 'header') {
        console.log('compare header to header')
        return sqlWhereCompareColumnToColumn(sqlConsts, left.val, right.val, finalTable, operator, dataTypes);
    } else if (left.type === 'string' && right.type === 'string') {
        return sqlWhereCompareStringToString(sqlConsts, left.val, right.val, finalTable, operator, dataTypes);
    } else {
        return sqlWhereCompareHeaderToString(
            sqlConsts,
            (left.type === 'header' ? left.val : right.val), 
            (left.type === 'string' ? left.val : right.val), 
            finalTable, operator, dataTypes);
    }
}


const parseOrderByClause = (sqlConsts, orderBy, finalTable) => {
    if (!orderBy.length) return finalTable;
    const [_, columnName, extraKeyword] = orderBy;
    finalTable = sqlOrderBy(sqlConsts, finalTable, columnName, extraKeyword);
    return finalTable;
}

const parseLimitClause = (limitClause, finalTable) => {
    if (!isNaN(limitClause[1])) {
        finalTable.table = finalTable.table.slice(0, parseInt(limitClause[1]) + 1);
    }
    return finalTable;
}