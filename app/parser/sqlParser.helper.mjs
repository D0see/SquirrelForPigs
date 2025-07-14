const buildCompositeKeywords = (nextCompositeKeyWordsWord, words) => {
    for (let i = 0; i < words.length; i++) {
        if (nextCompositeKeyWordsWord[words[i]] && nextCompositeKeyWordsWord[words[i]][words[i + 1]]) {
            words[i] += ` ${words[i + 1]}`;
            words.splice(i + 1, 1);
            i-=2;
        }
    }
}

//TODO : optimize this
export const cleanQueryInput = (sqlKeywords, nextCompositeKeyWordsWord, equivalentKeywords, input) => {

    //builds a map of for every sqlKeywords value
    const keywordsObj = Object.values(sqlKeywords).reduce((acc, val) => {
        acc[val] = true;
        return acc;
    }, {});

    //removes empty spaces
    let query = input.split(' ').map(word => word.trim()).filter(word => word);
    //make sure keyword are uppercase
    query = query.map(word => keywordsObj[word.toUpperCase()] ? word.toUpperCase() : word);
    buildCompositeKeywords(nextCompositeKeyWordsWord, query);
    //replaces obsolete keywords for equivalent ones
    query = query.map(word => equivalentKeywords[word] ? equivalentKeywords[word] : word);
    return query;
}

export const findTableInTableArray = (tableName, tableArr) => {
    const result = tableArr.filter(table => table.tableName === tableName || (table.alias ? table.alias === tableName : false));
    if (result.length === 0) throw new Error(`no table with name : ${tableName}`);
    if (result.length > 1) throw new Error(`ambiguous result for tableName : ${tableName}`);
    return result[0];
}

export const findEndIndexOfKeywordQuery = (keywords, words, index) => {
    for (let i = index; i < words.length; i++) {
        if (keywords[words[i + 1]]) return i;
    }
    return words.length - 1
}

// words => columnAliases = ['','',"aliasforcolumn3",'']
// updates words to remove columns aliases affectations
export const columnsHeadersAliasesHandler = (sqlKeywords, words) => {
    const columnsAliases = []
    const selectIndex = words.findIndex(word => word === sqlKeywords.SELECT);
    let fromIndex = words.findIndex(word => word === sqlKeywords.FROM);
    for(let i = selectIndex + 1; i < fromIndex - 1; i++) {
        if (words[i + 1] === sqlKeywords.ALIAS_ASSIGNEMENT) {
            columnsAliases.push(words[i + 2]);
            words.splice(i + 1, 2);
            fromIndex -= 2;
        } else {
            columnsAliases.push('');
        }
        
    }
    return columnsAliases;
}

export const applyHeadersAliases = (table, columnHeaderAliases) => {
    for (let i = 0; i < table.table[0].length; i++) {
        if (!columnHeaderAliases[i]) continue;
        table.table[0][i] = columnHeaderAliases[i];
    }
}

export const tablesAliasesHandler = (sqlKeywords, words, tables) => {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === sqlKeywords.ALIAS_ASSIGNEMENT) {
            let table = findTableInTableArray(words[i - 1], tables);
            const alias = words[i + 1];

            //Error handling
            if (!table) throw new Error(`No table with name : ${words[i - 1]}`);
            if (!alias || sqlKeywords[alias]) throw new Error(`Invalid or absent alias for table : ${table.tableName}`);
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
            if (table.table[0][i].split('.').length < 2) table.table[0][i] += '.' + table.tableName;
            if (table.alias) table.table[0][i] += '.' + table.alias;
            //TODO : fix this
        }
    }
}

// tableHeaders : header.a.b => header
export const normalizeHeaders = (table) => {
    for (let i = 0; i < table.table[0].length; i++) {
        const header = table.table[0][i].split('.');
        table.table[0][i] = header.length >= 3 ? header[2] + '.' + header[0] : header[0];
    }
}

export const turnRightJoinIntoLeftJoin = (sqlKeywords, words) => {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === sqlKeywords.RIGHT_JOIN) {
            words[i] = sqlKeywords.LEFT_JOIN;
            let temp = words[i - 1]
            words[i - 1] = words[i + 1]
            words[i + 1] = temp;
            const leftJoinOnIndex = words.findIndex((word, index) => index > i && word === '=');
            temp = words[leftJoinOnIndex - 1]
            words[leftJoinOnIndex - 1] = words[leftJoinOnIndex + 1]
            words[leftJoinOnIndex + 1] = temp;
        }
    }
}

export const applySqlJoinQuery = (sqlJoinMethodCallback, query, tables) => {
    const table1 = findTableInTableArray(query[0], tables);
    let tablesWithoutTable1 = tables;
    if (table1.alias) {
        tablesWithoutTable1 = tables.filter(table => table.alias != table1.alias);
    }
    const table2 = findTableInTableArray(query[2], tablesWithoutTable1);
    const resultTable = sqlJoinMethodCallback(table1, table2, query[4], query[6], query[5]);
    return resultTable;
}

