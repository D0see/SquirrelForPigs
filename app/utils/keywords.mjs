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
    'LEFT JOIN' : true,
    'RIGHT JOIN' : true,
    'INNER JOIN' : true,
    'LEFT OUTER JOIN' : true,
    'RIGHT OUTER JOIN' : true,
    'SELECT' : true,
    'LEFT' : true,
    'RIGHT' : true,
    'INNER' : true,
    'JOIN' : true,
    'AS' : true,
    'ON' : true,
    'FROM' : true,
}