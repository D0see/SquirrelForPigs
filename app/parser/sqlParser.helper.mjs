import { nextCompositeKeyWordsWord } from "../utils/keywords.mjs"
//TODO : should import allkeywords here directly instead of passing it to every other functions

const buildCompositeKeywords = (words) => {
    for (let i = 0; i < words.length; i++) {
        if (nextCompositeKeyWordsWord[words[i]] && nextCompositeKeyWordsWord[words[i]] === words[i + 1]) {
            words[i] += ` ${words[i + 1]}`;
            words.splice(i + 1, 1);
        }
    }
}

//TODO : optimize this
export const cleanseInput = (allKeywords, input) => {

    //removes empty spaces
    let result = input.split(' ').map(word => word.trim()).filter(word => word);

    //make sure keyword are uppercase
    result = result.map(word => allKeywords[word.toUpperCase()] ? word.toUpperCase() : word);

    buildCompositeKeywords(result);

    //TODO : replace equivalentkeyWords
    
    return result;
}

export const findTableInTableArray = (tableName, tableArr) => {
    const result = tableArr.filter(table => table.tableName === tableName || (table.alias ? table.alias === tableName : false));
    if (result.length === 0) throw new Error(`no table with name : ${tableName}`);
    if (result.length > 1) throw new Error(`ambiguous result for tableName : ${tableName}`);
    return result[0];
}

export const findEndIndexOfKeywordQuery = (keywords, words, index) => {
    for (let i = index; i < words.length; i++) {
        if (keywords[words[i + 1]]) {
            return i;
        }
    }
    return words.length - 1
}

// words => columnAliases = ['','',"aliasforcolumn3",'']
// updates words to remove columns aliases affectations
export const columnsHeadersAliasesHandler = (words) => {
    const columnsAliases = []
    const selectIndex = words.findIndex(word => word === "SELECT");
    let fromIndex = words.findIndex(word => word === "FROM");
    for(let i = selectIndex + 1; i < fromIndex - 1; i++) {
        if (words[i + 1] != "AS") {
            columnsAliases.push('');
            continue;
        };
        columnsAliases.push(words[i + 2]);
        words.splice(i + 1, 2);
        fromIndex -= 2;
    }
    return columnsAliases;
}

export const applyHeadersAliases = (table, columnHeaderAliases) => {
    for (let i = 0; i < table.table[0].length; i++) {
        if (!columnHeaderAliases[i]) continue;
        table.table[0][i] = columnHeaderAliases[i];
    }
}

export const tablesAliasesHandler = (keywords, words, tables) => {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === "AS") {
            let table = findTableInTableArray(words[i - 1], tables);
            const alias = words[i + 1];

            //Error handling
            if (!table) throw new Error(`No table with name : ${words[i - 1]}`);
            if (!alias || keywords[alias]) throw new Error(`Invalid or absent alias for table : ${table.tableName}`);
            //Check for name conflict between specified alias and tables names and aliases
            const aliasOrNameCollidingTables = tables.filter(table => [table.tableName, table.alias].includes(alias));
            if (aliasOrNameCollidingTables.length) throw new Error(`Name collision for alias : ${alias}`);

            //Create new table if specified table already has an alias
            if (table.alias) {
                table = structuredClone(table);
                tables.push(table);
            }
            
            //Alias updating
            table.alias = alias; 
            //Query updating
            words.splice(i - 1, 2);
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
        const header = table.table[0][i].split('.');
        table.table[0][i] = header.length === 3 ? header[2] + '.' + header[0] : header[0];
    }
}

export const turnRightJoinIntoLeftJoin = (words) => {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === "RIGHT JOIN") {
            words[i] = "LEFT JOIN";
            let temp = words[i - 1]
            words[i - 1] = words[i + 1]
            words[i + 1] = temp;
            const leftJoinOnIndex = words.findIndex((word, index) => index > i && word === '=');
            let temp2 = words[leftJoinOnIndex - 1]
            words[leftJoinOnIndex - 1] = words[leftJoinOnIndex + 1]
            words[leftJoinOnIndex + 1] = temp2;
        }
    }

}