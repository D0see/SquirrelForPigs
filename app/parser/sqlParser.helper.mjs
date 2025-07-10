import { keywords } from "../utils/keywords.mjs";

export const findTableInTableArray = (tableName, tableArr) => {
    const tableIndex = tableArr.findIndex(table => table.tableName === tableName);
    if (!tableArr[tableIndex]) throw new Error(`no table with name : ${tableName}`);
    return tableArr[tableIndex];
}

export const findEndIndexOfKeywordQuery = (keywords, words, index) => {
    for (let i = index; i < words.length; i++) {
        if (keywords[words[i + 1]]) {
            return i;
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
            //Check for name conflict between specified alias and tables names and aliases
            const aliasOrNameCollidingTables = tables.filter(table => table.tableName === alias || table.alias === alias);
            if (aliasOrNameCollidingTables.length) throw new Error(`name collision for alias : ${alias}`);

            //Create new table if specified table already has an alias
            if (table.alias) {
                table = structuredClone(table);
                tables.push(table);
            }
            
            //Alias updating
            table.alias = alias; 
            //Query updating
            words.splice(i, 2);
            i -= 2;
        }
    }
}

export const buildDescriptiveHeaders = (tables) => {
    for (const table of tables) {
        for (let i = 0; i < table.table[0].length; i++) {
            table.table[0][i] += '.' + table.tableName;
            if (table.alias) table.table[0][i] += '.' + table.alias;
        }
    }
}

// tableHeaders : header.a.b => header
export const normalizeHeaders = (table) => {
    for (let i = 0; i < table.table[0].length; i++) {
        table.table[0][i] = table.table[0][i].split('.')[0];
    }
}