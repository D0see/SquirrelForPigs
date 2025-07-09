import { keywords } from "../utils/keywords.mjs";

export const findTableInTableArray = (tableName, tableArr) => {
    const tableIndex = tableArr.findIndex(table => table.tableName === tableName);
    return tableArr[tableIndex];
}

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
            let table = findTableInTableArray(words[i - 1], tables);
            const alias = words[i + 1];
            //Error handling
            if (!table) throw new Error(`no table with name : ${words[i - 1]}`);
            if (!alias || keywords[alias]) throw new Error(`invalid or absent alias for table : ${table.tableName}`);

            //TODO: CHECK FOR ALIAS CONFLICT WITH OTHER TABLES NAME & ALIASES

            //CREATE NEW TABLE IF TABLE ALREADY HAS ALIAS
            if (table.alias) {
                table = structuredClone(table);
                table.alias = alias;
                tables.push(table);
                words.splice(i, 2);
                i -= 2;
                continue;
            }
            
            //Alias updating
            table.alias = words[i + 1]; 
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