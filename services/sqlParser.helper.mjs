import { keywords } from "../utils/keywords.mjs";

export const findEndIndexOfKeywordQuery = (keywords, words, index) => {
    for (let i = index + 2; i < words.length; i++) {
        if (keywords[words[i]]) {
            return i - 1;
        }
    }
    return words.length - 1
}

export const queryAliasesHandler = (words, tables) => {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === "AS") {
            //Error handling
            if (!tables[words[i - 1]]) throw new Error(`no table with name : ${words[i - 1]}`);
            if (!words[i + 1] || keywords[words[i + 1]]) throw new Error(`invalid or absent alias for table : ${words[i - 1]}`);

            //TODO: CHECK FOR ALIAS CONFLICT WITH OTHER TABLES NAME & ALIASES

            //Alias updating
            tables[words[i - 1]].alias = words[i + 1]; 
            words.splice(i, 2);
            i -= 2;
        }
    }
}

export const buildDescriptiveHeaders = (tables) => {
    Object.keys(tables).forEach(tableKey => {
        const table = tables[tableKey];
        for (let i = 0; i < table.table[0].length; i++) {
            table.table[0][i] += '.' + table.tableName;
            if (table.alias) table.table[0][i] += '.' + table.alias;

        }
    });
}

// tableHeaders : header.a.b => header
export const normalizeHeaders = (table) => {
    for (let i = 0; i < table.table[0].length; i++) {
        table.table[0][i] = table.table[0][i].split('.')[0];
    }
}