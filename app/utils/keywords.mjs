export const nextCompositeKeyWordsWord = {
    'LEFT' : {
        'JOIN' : true,
        'OUTER' : true,
    },
    'RIGHT' : {
        'JOIN' : true,
        'OUTER' : true,
    },
    'LEFT OUTER' : {'JOIN' : true},
    'RIGHT OUTER' : {'JOIN' : true},
    'INNER' : {'JOIN' : true},
}

export const joinKeywords = {
    'LEFT JOIN' : true,
    'INNER JOIN' : true,
}

export const equivalentKeywords = {
    'JOIN' : 'INNER JOIN',
    'LEFT OUTER JOIN' : 'LEFT JOIN',
    'RIGHT OUTER JOIN' : 'RIGHT JOIN',
}

export const sqlKeywords = {
    'LEFT_JOIN' : 'LEFT JOIN',
    'RIGHT_JOIN' : 'RIGHT JOIN',
    'INNER_JOIN' : 'INNER JOIN',
    'LEFT_OUTER_JOIN' : 'LEFT OUTER JOIN',
    'RIGHT_OUTER_JOIN' : 'RIGHT OUTER JOIN',
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
}