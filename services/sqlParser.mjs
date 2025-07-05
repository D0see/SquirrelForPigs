import { sqlLeftJoin } from "./sqlFunctions.mjs";
import { keywords } from "../utils/keywords.mjs";
import { findEndOfKeywordQuery } from "./sqlParser.helper.mjs";

export const SqlParser = (input, tables) => {

    const keywordsIndexes = {}

    const words = input.split(' ');
    for (const [index, word] of words.entries()) {
        keywordsIndexes[word] ? keywordsIndexes[word].push(index) : keywordsIndexes[word] = [index];
    }

    // for (const index of keywordsIndexes['LEFTJOIN']) {
    const index = keywordsIndexes['LEFTJOIN'][0] 
    const endIndex = findEndOfKeywordQuery(keywords, words, index);
    const query = words.slice(index - 1, endIndex + 1);

    const table1 = tables.find(table => table.tableName === query[0]);
    const table2 = tables.find(table => table.tableName === query[2]);

    const resultTable = sqlLeftJoin(table1, table2, query[4], query[6], query[5])

    return resultTable
} 