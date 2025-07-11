import { sqlLeftJoin, sqlInnerJoin, sqlSelect } from "../services/sqlFunctions.mjs";
import { allKeywords, transformationKeywords } from "../utils/keywords.mjs";
import { cleanseInput, tablesAliasesHandler, buildDescriptiveHeaders, turnRightJoinIntoLeftJoin, findEndIndexOfKeywordQuery, normalizeHeaders, findTableInTableArray, columnsHeadersAliasesHandler, applyHeadersAliases } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tablesObj) => {

    const words = cleanseInput(allKeywords, input);

    console.log(words)

    const tables = [];
    for (const key of Object.keys(tablesObj)) {
        tables.push(tablesObj[key]);
    }

    const selectedColumnsHeaderAliases = columnsHeadersAliasesHandler(words);

    //updates tables aliases in place and remove them for the query  
    tablesAliasesHandler(transformationKeywords, words, tables);

    //updates tables headers in place based on their aliases and names (table.Name : a, table.alias : b => header.a.b)
    buildDescriptiveHeaders(tables);

    //updates the query in place "table1 RIGHTJOIN table2 on table1.header = table2.header" => "table2 LEFTJOIN table1 on table2.header = table1.header"
    turnRightJoinIntoLeftJoin(words);

    //TODO : TURN THIS BLOCK INTO A FUNCTION 
    let currIntermediaryTable;
    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        if (word === 'LEFT JOIN') {
            const endIndex = findEndIndexOfKeywordQuery(transformationKeywords, words, index);
            const query = words.slice(index - 1, endIndex + 1);
            currIntermediaryTable = parseLeftJoin(query, tables);

            //builds intermediary table and updates query
            tables.push(currIntermediaryTable);
            words.splice(index - 1, endIndex + 2 - index, currIntermediaryTable.tableName);
            index--;

        } else if (word === 'INNER JOIN') {
            const endIndex = findEndIndexOfKeywordQuery(transformationKeywords, words, index);
            const query = words.slice(index - 1, endIndex + 1);
            currIntermediaryTable = parseInnerJoin(query, tables);

            //builds intermediary table and updates query
            tables.push(currIntermediaryTable);
            words.splice(index - 1, endIndex + 2 - index, currIntermediaryTable.tableName)
            index--;
        }
    }


    //const endIndex = findEndOfKeywordQuery(keywords, words, index);
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
    currIntermediaryTable = sqlSelect(selectedColumns, selectedFromTable);

    //removes aliases and tablename from column headers
    normalizeHeaders(currIntermediaryTable);

    applyHeadersAliases(currIntermediaryTable, selectedColumnsHeaderAliases)

    return currIntermediaryTable
} 


//TODO : REFACTOR THESE FUNCTIONS 

//after a left join what stays in the query is the new table Name
const parseLeftJoin = (query, tables) => {
    const table1 = findTableInTableArray(query[0], tables);
    let tablesWithoutTable1 = tables;
    if (table1.alias) {
        tablesWithoutTable1 = tables.filter(table => table.alias != table1.alias);
    }
    const table2 = findTableInTableArray(query[2], tablesWithoutTable1);
    const resultTable = sqlLeftJoin(table1, table2, query[4], query[6], query[5]);
    return resultTable;
}

//after an inner join what stays in the query is the new table Name
const parseInnerJoin = (query, tables) => {
    const table1 = findTableInTableArray(query[0], tables);
    let tablesWithoutTable1 = tables;
    if (table1.alias) {
        tablesWithoutTable1 = tables.filter(table => table.alias != table1.alias);
    }
    const table2 = findTableInTableArray(query[2], tablesWithoutTable1);
    const resultTable = sqlInnerJoin(table1, table2, query[4], query[6], query[5]);
    return resultTable;
}