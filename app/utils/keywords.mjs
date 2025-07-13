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

export const allKeywords = {
    'LEFT JOIN' : 'LEFT JOIN',
    'RIGHT JOIN' : 'RIGHT JOIN',
    'INNER JOIN' : 'INNER JOIN',
    'LEFT OUTER JOIN' : 'LEFT OUTER JOIN',
    'RIGHT OUTER JOIN' : 'RIGHT OUTER JOIN',
    'SELECT' : 'SELECT',
    'LEFT' : 'LEFT',
    'RIGHT' : 'RIGHT',
    'INNER' : 'INNER',
    'JOIN' : 'JOIN',
    'AS' : 'AS',
    'ON' : 'ON',
    'FROM' : 'FROM',
}