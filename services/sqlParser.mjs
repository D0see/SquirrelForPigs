import { sqlLeftJoin, sqlSelect } from "./sqlFunctions.mjs";
import { keywords } from "../utils/keywords.mjs";
import { queryAliasesHandler, buildDescriptiveHeaders, findEndIndexOfKeywordQuery, normalizeHeaders } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tables) => {

    const words = input.split(' ');

    //updates tables aliases and remove them for the query
    queryAliasesHandler(words, tables);

    //updates tables headers based on their aliases and names (table.Name : a, table.alias : b => header.a.b)
    buildDescriptiveHeaders(tables);

    let currIntermediaryTable;
    while(words.includes('LEFTJOIN')) {
        const leftJoinIndex = words.findIndex(word => word === 'LEFTJOIN');
        const endIndex = findEndIndexOfKeywordQuery(keywords, words, leftJoinIndex);
        const query = words.slice(leftJoinIndex - 1, endIndex + 1);
        currIntermediaryTable = parseLeftJoin(query, tables);

        //builds intermediary table and updates query
        tables[currIntermediaryTable.tableName] = currIntermediaryTable;
        words.splice(leftJoinIndex - 1, endIndex + 2 - leftJoinIndex, currIntermediaryTable.tableName)
    }

    //const endIndex = findEndOfKeywordQuery(keywords, words, index);
    const selectIndex = words.findIndex(word => word === 'SELECT');
    let lastElemIndex;
    for (const [index, word] of words.entries()) {
        if (word === 'FROM') {
            lastElemIndex = index + 1;
        }
    }
    const selectedColumns = words.slice(selectIndex + 1, lastElemIndex);
    const selectedFromTable = tables[words[lastElemIndex]];
    currIntermediaryTable = sqlSelect(selectedColumns, selectedFromTable);

    //removes aliases and tablename from column headers
    normalizeHeaders(currIntermediaryTable);

    return currIntermediaryTable
} 

//after a left join what stays in the query is the new table Name
const parseLeftJoin = (query, tables) => {

    const table1 = tables[query[0]];
    const table2 = tables[query[2]];
    const resultTable = sqlLeftJoin(table1, table2, query[4], query[6], query[5]);

    return resultTable;
}