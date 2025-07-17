export const sqlKeywords = {
    'LEFT_JOIN' : 'LEFT JOIN',
    'RIGHT_JOIN' : 'RIGHT JOIN',
    'INNER_JOIN' : 'INNER JOIN',
    'LEFT_OUTER_JOIN' : 'LEFT OUTER JOIN',
    'RIGHT_OUTER_JOIN' : 'RIGHT OUTER JOIN',
    'OUTER' : 'OUTER', 
    'SELECT' : 'SELECT',
    'LEFT' : 'LEFT',
    'RIGHT' : 'RIGHT',
    'INNER' : 'INNER',
    'JOIN' : 'JOIN',
    'ALIAS_ASSIGNEMENT' : 'AS',
    'ON' : 'ON',
    'FROM' : 'FROM',
    'SELECT_ALL_COLUMNS' : '*',
    'SUBQUERY_START' : '(',
    'SUBQUERY_END' : ')',
    'WHERE' : 'WHERE',
    'COMMA' : ',',
}

export const reservedKeyWords = Object.values(sqlKeywords);

export const multipleConditionnalKeyword = 'AND'


export const sqlOperators = { 
    'EQUAL' : '=',
    'DIFFERENT_FROM' : '!=',
    'STRICTLY_INFERIOR' : '<',
    'STRICTLY_SUPERIOR' : '>',
    'INFERIOR_OR_EQUAL' : '<=',
    'SUPERIOR_OR_EQUAL' : '>=',
}

export const sqlOperatorsJsEquivalent = {
    [sqlOperators.EQUAL] : '===',
    [sqlOperators.DIFFERENT_FROM] : '!=',
    [sqlOperators.STRICTLY_INFERIOR] : '<',
    [sqlOperators.STRICTLY_SUPERIOR] : '>',
    [sqlOperators.INFERIOR_OR_EQUAL] : '<=',
    [sqlOperators.SUPERIOR_OR_EQUAL] : '>=',
    
}

export const dataTypes = {
    'NUMBER' : 'NUMBER',
    'DATETIME' : 'DATETIME',
    'VARCHAR' : 'VARCHAR',
}

export const dataPrecedenceValue = {
    [dataTypes.NUMBER] : 1,
    [dataTypes.DATETIME] : 2,
    [dataTypes.VARCHAR] : 3,
}

export const nextCompositeKeyWordsWord = {
    [sqlKeywords.LEFT] : {
        [sqlKeywords.JOIN] : true,
        [sqlKeywords.OUTER] : true,
    },
    [sqlKeywords.RIGHT] : {
        [sqlKeywords.JOIN] : true,
        [sqlKeywords.OUTER] : true,
    },
    [sqlKeywords.LEFT + ' ' + sqlKeywords.OUTER] : {[sqlKeywords.JOIN] : true,},
    [sqlKeywords.RIGHT + ' ' + sqlKeywords.OUTER] : {[sqlKeywords.JOIN] : true,},
    [sqlKeywords.INNER] : {[sqlKeywords.JOIN] : true,},
}

export const joinKeywords = {
    [sqlKeywords.LEFT_JOIN] : true,
    [sqlKeywords.INNER_JOIN] : true,
}

export const equivalentKeywords = {
    [sqlKeywords.JOIN] : sqlKeywords.INNER_JOIN,
    [sqlKeywords.LEFT_OUTER_JOIN] : sqlKeywords.LEFT_JOIN,
    [sqlKeywords.RIGHT_OUTER_JOIN] : sqlKeywords.RIGHT_JOIN,
}