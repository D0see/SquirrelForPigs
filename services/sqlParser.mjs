import { sqlLeftJoin, sqlSelect } from "./sqlFunctions.mjs";
import { keywords } from "../utils/keywords.mjs";
import { findEndOfKeywordQuery } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tables) => {
    const keywordsIndexes = {}

    const words = input.split(' ');
    for (const [index, word] of words.entries()) {
        keywordsIndexes[word] ? keywordsIndexes[word].push(index) : keywordsIndexes[word] = [index];
    }

    let currIntermediaryTable;
    // for (const index of keywordsIndexes['LEFTJOIN'].reverse()) {
        const leftJoinIndex = keywordsIndexes['LEFTJOIN'].reverse()[keywordsIndexes['LEFTJOIN'].length - 1];
        const endIndex = findEndOfKeywordQuery(keywords, words, leftJoinIndex);
        const query = words.slice(leftJoinIndex - 1, endIndex + 1);
        currIntermediaryTable = parseLeftJoin(query, tables);
        tables[currIntermediaryTable.tableName] = currIntermediaryTable;
        words.splice(leftJoinIndex - 1, endIndex + 1, currIntermediaryTable.tableName)
    // }

    for (const index of keywordsIndexes?.['SELECT'] ?? []) {
        //const endIndex = findEndOfKeywordQuery(keywords, words, index);
        let lastElemIndex;
        for (const [index, word] of words.entries()) {
            if (word === 'FROM') {
                lastElemIndex = index;
            }
        }
        const selectedColumns = words.slice(index + 1, lastElemIndex);
        const selectedFromTable = tables[words[lastElemIndex + 1]];
        currIntermediaryTable = sqlSelect(selectedColumns, selectedFromTable);
    }
    return currIntermediaryTable
} 

//after a left join what stays in the query is the new table Name
export const parseLeftJoin = (query, tables) => {

    const table1 = tables[query[0]];
    const table2 = tables[query[2]];
    const resultTable = sqlLeftJoin(table1, table2, query[4], query[6], query[5]);

    return resultTable;
}