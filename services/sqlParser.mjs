import { sqlLeftJoin, sqlSelect } from "./sqlFunctions.mjs";
import { keywords } from "../utils/keywords.mjs";
import { updateAliases, findEndIndexOfKeywordQuery } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tables) => {

    const words = input.split(' ');

    //updates aliases and remove them for the query
    aliasesHandler(words, tables);

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

    return currIntermediaryTable
} 

//after a left join what stays in the query is the new table Name
export const parseLeftJoin = (query, tables) => {

    const table1 = tables[query[0]];
    const table2 = tables[query[2]];
    const resultTable = sqlLeftJoin(table1, table2, query[4], query[6], query[5]);

    return resultTable;
}