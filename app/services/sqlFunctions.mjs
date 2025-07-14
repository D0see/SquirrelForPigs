import { appendColumnToTwoDArr, getColumnByIndexFromTable, getColumnHeadIndex, getColumnValuesByIndexFromTable } from './sqlFunctions.helper.mjs';

export const sqlSelect = (sqlKeywords, ColumnsHeadersSelected, tableSelected) => {
    const newTable = [[]];
    for (const head of ColumnsHeadersSelected) {
        if (head === sqlKeywords.SELECT_ALL_COLUMNS) {
            for (const header of tableSelected.table[0]) {
                const colunmIndex = getColumnHeadIndex(header, tableSelected);
                const values = getColumnByIndexFromTable(tableSelected.table, colunmIndex);
                appendColumnToTwoDArr(values, newTable);
            }
            continue;
        }
        const colunmIndex = getColumnHeadIndex(head, tableSelected);
        const values = getColumnByIndexFromTable(tableSelected.table, colunmIndex);
        appendColumnToTwoDArr(values, newTable);
    }
    return {
        table : newTable,
        tableName : `${tableSelected.tableName}-filtered`
    };
}

// For a join we first join the whole tables then select the correct headers
// For a join to work header 1 must reference a table1 header and header2 must reference a table2 header
export const sqlLeftJoin = (table1, table2, table1JoiningHeader, table2JoiningHeader, condOperator) => {

    const newTable = JSON.parse(JSON.stringify(table1.table));
    table2.table[0].forEach(header => {newTable[0].push(header)});

    const joiningHeaderIndexT1 = getColumnHeadIndex(table1JoiningHeader, table1);
    const joiningHeaderIndexT2 = getColumnHeadIndex(table2JoiningHeader, table2);
    table1.table.forEach((row, rowIndex) => {
        if (!rowIndex) return;
        const values = getColumnValuesByIndexFromTable(table2.table, joiningHeaderIndexT2);
        for (const [index, value] of values.entries()) {
            if (row[joiningHeaderIndexT1] === value) {
                newTable[rowIndex].push(...table2.table[index + 1])
            }
        }
    })

    //fill empty cells with empty values
    newTable.forEach((row, index) => {
        if (index === 0) return;
        while (row.length < newTable[0].length) {
            row.push('')
        }
    });

    return {
        table : newTable,
        tableName : `${table1.alias ? table1.alias : table1.tableName}-${table2.alias ? table2.alias : table2.tableName}`
    };
}

export const sqlInnerJoin = (table1, table2, table1JoiningHeader, table2JoiningHeader, condOperator) => {
    //build headers
    const newTable = [JSON.parse(JSON.stringify(table1.table[0])).concat(JSON.parse(JSON.stringify(table2.table[0])))];

    const joiningHeaderIndexT1 = getColumnHeadIndex(table1JoiningHeader, table1);
    const joiningHeaderIndexT2 = getColumnHeadIndex(table2JoiningHeader, table2);

    const table2JoiningColumnValues = getColumnValuesByIndexFromTable(table2.table, joiningHeaderIndexT2);
    for (let i = 1; i < table1.table.length; i++) {
        const matchingRowIndex = table2JoiningColumnValues.findIndex(value => value === table1.table[i][joiningHeaderIndexT1]) + 1;
        if (!matchingRowIndex) continue;
        newTable.push([
            ...table1.table[i].concat(table2.table[matchingRowIndex])
        ])
    }
    //fill empty cells with empty values
    newTable.forEach((row, index) => {
        if (index === 0) return;
        while (row.length < newTable[0].length) {
            row.push('')
        }
    });

    return {
        table : newTable,
        tableName : `${table1.alias ? table1.alias : table1.tableName}-${table2.alias ? table2.alias : table2.tableName}`
    };
}

//TODO : NEEDS URGENT REFACTOR  !!!!!
export const whereClause = (sqlKeywords, sqlOperators, whereClauseWords, finalTable) => {
    if (!whereClauseWords.length) return finalTable;

    let leftVal = whereClauseWords[1];
    let rightVal = whereClauseWords[3];
    if (sqlKeywords[leftVal] || sqlKeywords[rightVal]) throw new Error(`invalid names for values in ${sqlKeywords.WHERE} clause`);
    const operator = whereClauseWords[2];
    if (!sqlOperators[operator]) throw new Error(`no operator found in ${sqlKeywords.WHERE} clause`);

    const valTypes = {
        left : 'header',
        right : 'header'
    }
    
    if ((leftVal.startsWith('"') && leftVal.endsWith('"')) || (leftVal.startsWith("'") && leftVal.endsWith("'"))) {
        valTypes.left = 'string';
        leftVal = leftVal.slice(1, leftVal.length -1);
    }
    if ((rightVal.startsWith('"') && rightVal.endsWith('"')) || (rightVal.startsWith("'") && rightVal.endsWith("'"))) {
        valTypes.right = 'string';
        rightVal = rightVal.slice(1, rightVal.length -1);
    }

    const wheredtwoDArr = [structuredClone(finalTable.table[0])];

    if (valTypes.left === 'header' && valTypes.right === 'header') {
        const headerColIndex1 = getColumnHeadIndex(leftVal, finalTable);
        const headerColIndex2 = getColumnHeadIndex(rightVal, finalTable);
        for (let i = 0; i < finalTable.table.length; i++) {
            if (finalTable.table[i][headerColIndex1] === finalTable.table[i][headerColIndex2]) {
                    wheredtwoDArr.push(finalTable.table[i]);
            }
        }
    } else if (valTypes.left === 'string' && valTypes.right === 'string') {
        if (leftVal === rightVal) {
            wheredtwoDArr.push(...finalTable.table.slice(1));
        }
    } else {
        const headerColIndex = getColumnHeadIndex((valTypes.left === 'header' ? leftVal : rightVal), finalTable);
        for (let i = 0; i < finalTable.table.length; i++) {
            if (finalTable.table[i][headerColIndex] === (valTypes.left === 'string' ? leftVal : rightVal)) {
                wheredtwoDArr.push(finalTable.table[i]);
            }
        } 
    }

    finalTable.table = wheredtwoDArr;
    return finalTable;
}