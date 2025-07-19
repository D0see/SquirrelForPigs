//#region INPUT HANDLING

const buildCompositeKeywords = (nextCompositeKeyWordsWord, words) => {
    for (let i = 0; i < words.length; i++) {
        if (nextCompositeKeyWordsWord[words[i]] && nextCompositeKeyWordsWord[words[i]][words[i + 1]]) {
            words[i] += ` ${words[i + 1]}`;
            words.splice(i + 1, 1);
            i-=2;
        }
    }
}

// for testing
export { buildCompositeKeywords as _buildCompositeKeywords }; 

//TODO : optimize this + urgent refactor 
//TODO : SHOULD BE SPLITTED IN 2 FUNCTIONS CLEANING INPUT AND SPLITTING QUERIES
export const cleanQueryInput = (sqlConsts, input) => {
    const {sqlKeywords, reservedKeyWords, nextCompositeKeyWordsWord, equivalentKeywords, multipleConditionnalKeyword} = sqlConsts;

    //removes commas
    const commaRegex = new RegExp(sqlKeywords.COMMA, 'g');
    input = input.replace(commaRegex, '') 

    //removes empty spaces
    let query = input.split(' ').map(word => word.trim()).filter(word => word);

    //make sure keyword are uppercase
    query = query.map(word => 
        reservedKeyWords[word.toUpperCase()] || 
        word.toUpperCase() === multipleConditionnalKeyword.toUpperCase() 
        ? word.toUpperCase() : word);

    buildCompositeKeywords(nextCompositeKeyWordsWord, query);

    //replaces obsolete keywords for equivalent ones
    query = query.map(word => equivalentKeywords[word] ? equivalentKeywords[word] : word);


    /*SPLITTING QUERIES
        SELECT 
        FROM 
        JOIN 
        WHERE 
        GROUP BY 
        HAVING 
        ORDER BY 
        LIMIT */
        
    let queryBody = query;

    const whereIndex = query.findIndex(word => word === sqlKeywords.WHERE);
    let whereClause = query.slice(whereIndex);
    let whereClauses = [];
    
    const orderByIndex = query.findIndex(word => word === sqlKeywords.ORDER_BY);
    let orderByClause = [];
    
    const limitIndex =  query.findIndex(word => word === sqlKeywords.LIMIT);
    let limitClause = query.slice(limitIndex, limitIndex + 2);
    
    //incrementaly reduce the queryBody based on present clauses
    if (limitIndex !== -1) queryBody = query.slice(0, limitIndex);
    if (orderByIndex !== -1) {
        orderByClause = query.slice(orderByIndex);
        queryBody = query.slice(0, orderByIndex);
        if (limitIndex !== -1) orderByClause = query.slice(orderByIndex, limitIndex);
    }
        
    if (whereIndex !== -1) {
        // this the composite where clause into multiple where clause
        if (limitIndex !== -1) whereClause = query.slice(whereIndex, limitIndex);
        if (orderByIndex !== -1) whereClause = query.slice(whereIndex, orderByIndex);
        whereClauses = buildMultipleWhereClauses(sqlKeywords, multipleConditionnalKeyword, whereClause);
        queryBody = query.slice(0, whereIndex);
    }

    return [queryBody, whereClauses, orderByClause, limitClause];
}

const buildMultipleWhereClauses = (sqlKeywords, multipleConditionnalKeyword, inputArr) => {
    const result = [];
    let start = 0;
    for (let i = 1; i < inputArr.length; i++) {
        if (multipleConditionnalKeyword === inputArr[i]) {
            result.push([sqlKeywords.WHERE, ...inputArr.slice(start + 1, i)]);
            start = i;
        }
        if (i === inputArr.length - 1) result.push([sqlKeywords.WHERE, ...inputArr.slice(start + 1)]);
    }
    return result;
}

export const turnRightJoinIntoLeftJoin = (sqlConsts, words) => {
    const { sqlKeywords } = sqlConsts;
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

export const findEndIndexOfKeywordQuery = (keywords, words, index) => {
    for (let i = index; i < words.length; i++) {
        if (keywords[words[i + 1]]) return i;
    }
    return words.length - 1
}

export const tablesAliasesHandler = (sqlConsts, words, tables) => {
    const { sqlKeywords, reservedKeyWords } = sqlConsts;
    
    for (let i = 0; i < words.length; i++) {
        if (words[i] === sqlKeywords.ALIAS_ASSIGNEMENT) {
            let table = findTableInTableArray(words[i - 1], tables);
            const alias = words[i + 1];

            //Error handling
            if (!table) throw new Error(`No table with name : ${words[i - 1]}`);
            if (!alias || reservedKeyWords[alias]) throw new Error(`Invalid or absent alias for table : ${table.tableName}`);
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

export const findQueryEndSymbol = (sqlKeywords, openPar, input) => {
    let subQueryCounter = 0;
    for (let i = openPar + 1; i < input.length; i++) {
        if (input[i] === sqlKeywords.SUBQUERY_START) {
            subQueryCounter++;
            continue;
        } else if (input[i] === sqlKeywords.SUBQUERY_END) {
            if (!subQueryCounter) return i;
            subQueryCounter--;
        }
    }
    return -1
}


//#endregion

//#region RESULT TABLE FUNCS
export const findTableInTableArray = (tableName, tableArr) => {
    const result = tableArr.filter(table => table.tableName === tableName || (table.alias ? table.alias === tableName : false));
    if (result.length === 0) throw new Error(`no table with name : ${tableName}`);
    if (result.length > 1) throw new Error(`ambiguous result for tableName : ${tableName}`);
    return result[0];
}

// words => columnAliases = ['','',"aliasforcolumn3",'']
// updates words to remove columns aliases affectations
export const columnsHeadersAliasesHandler = (sqlConsts, words) => {
    const { sqlKeywords } = sqlConsts;

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

//#endregion


//#region UTILS

export const paramIsDirectValueRepresentation = (param) => {
    return ((param.startsWith('"') && param.endsWith('"')) || (param.startsWith("'") && param.endsWith("'") || !isNaN(param)));
}
