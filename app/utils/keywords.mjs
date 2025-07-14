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
}

export const sqlOperators = { 
    '=' : 'EQUAL',
    '!=' : 'DIFFERENT_FROM',
}

//TODO : make this programatic
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

//TODO : this needs to depends on sqlKeywords
export const joinKeywords = {
    [sqlKeywords.LEFT_JOIN] : true,
    [sqlKeywords.INNER_JOIN] : true,
}

//TODO : same
export const equivalentKeywords = {
    [sqlKeywords.JOIN] : sqlKeywords.INNER_JOIN,
    [sqlKeywords.LEFT_OUTER_JOIN] : sqlKeywords.LEFT_JOIN,
    [sqlKeywords.RIGHT_OUTER_JOIN] : sqlKeywords.RIGHT_JOIN,
}