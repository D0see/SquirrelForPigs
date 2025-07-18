import { appendColumnToTwoDArr, getColumnByIndexFromTable, getColumnHeadIndex, getColumnValuesByIndexFromTable, compareData } from './sqlFunctions.helper.mjs';

export const sqlSelect = (sqlConsts, ColumnsHeadersSelected, tableSelected) => {
    const { sqlKeywords } = sqlConsts;

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
export const sqlLeftJoin = (sqlConsts, dataTypes, table1, table2, table1JoiningHeader, table2JoiningHeader, operator) => {
    const { sqlOperatorsJsEquivalent } = sqlConsts;

    const newTable = JSON.parse(JSON.stringify(table1.table));
    table2.table[0].forEach(header => {newTable[0].push(header)});

    const joiningHeaderIndexT1 = getColumnHeadIndex(table1JoiningHeader, table1);
    const joiningHeaderIndexT2 = getColumnHeadIndex(table2JoiningHeader, table2);
    table1.table.forEach((row, rowIndex) => {
        if (!rowIndex) return;
        const values = getColumnValuesByIndexFromTable(table2.table, joiningHeaderIndexT2);
        for (const [index, value] of values.entries()) {
            if (compareData(dataTypes, sqlOperatorsJsEquivalent, operator, row[joiningHeaderIndexT1], value)) {
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

export const sqlInnerJoin = (sqlConsts, dataTypes, table1, table2, table1JoiningHeader, table2JoiningHeader, operator) => {
    const { sqlOperatorsJsEquivalent } = sqlConsts;

    //build headers
    const newTable = [JSON.parse(JSON.stringify(table1.table[0])).concat(JSON.parse(JSON.stringify(table2.table[0])))];

    const joiningHeaderIndexT1 = getColumnHeadIndex(table1JoiningHeader, table1);
    const joiningHeaderIndexT2 = getColumnHeadIndex(table2JoiningHeader, table2);

    for (let i = 1; i < table1.table.length; i++) {
        for (let j = 1; j < table2.table.length; j++) {
            if (compareData(dataTypes, sqlOperatorsJsEquivalent, operator, table1.table[i][joiningHeaderIndexT1], table2.table[j][joiningHeaderIndexT2])) {
                newTable.push([
                    ...table1.table[i].concat(table2.table[j])
                ])
            }
        }
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

//TODO IMPLEMENT
export const fullOuterJoin = () => {}

export const sqlWhereCompareColumnToColumn = (sqlConsts, leftVal, rightVal, finalTable, operator, dataTypes) => {
    const { sqlOperatorsJsEquivalent } = sqlConsts;

    const wheredtwoDArr = [structuredClone(finalTable.table[0])];
    const headerColIndex1 = getColumnHeadIndex(leftVal, finalTable);
    const headerColIndex2 = getColumnHeadIndex(rightVal, finalTable);

    for (let i = 1; i < finalTable.table.length; i++) {
        if (compareData(dataTypes, sqlOperatorsJsEquivalent, operator, finalTable.table[i][headerColIndex1], finalTable.table[i][headerColIndex2])) {
            wheredtwoDArr.push(finalTable.table[i]);
        }
    }

    finalTable.table = wheredtwoDArr;
    return finalTable;
}

export const sqlWhereCompareStringToString = (sqlConsts, leftVal, rightVal, finalTable, operator, dataTypes) => {
    const { sqlOperatorsJsEquivalent } = sqlConsts;

    const wheredtwoDArr = [structuredClone(finalTable.table[0])];
    if (compareData(dataTypes, sqlOperatorsJsEquivalent, operator, leftVal, rightVal)) {
        wheredtwoDArr.push(...finalTable.table.slice(1));
    } 
    finalTable.table = wheredtwoDArr;
    return finalTable;
}

export const sqlWhereCompareHeaderToString = (sqlConsts, headerVal, stringVal, finalTable, operator, dataTypes) => {
    const { sqlOperatorsJsEquivalent } = sqlConsts;

    const wheredtwoDArr = [structuredClone(finalTable.table[0])];
    const headerColIndex = getColumnHeadIndex(headerVal, finalTable);

    for (let i = 1; i < finalTable.table.length; i++) {
        if (compareData(dataTypes, sqlOperatorsJsEquivalent, operator, finalTable.table[i][headerColIndex], stringVal)) {
            wheredtwoDArr.push(finalTable.table[i]);
        }
    } 

    finalTable.table = wheredtwoDArr;
    return finalTable;
}

export const sqlOrderBy = (appConsts, finalTable, columnName, extraKeyword) => {
    const { sqlKeywords } = appConsts;
    const compareIndex = getColumnHeadIndex(columnName, finalTable);

    let sortedTable;
    if ( extraKeyword === sqlKeywords.DESC) {
        sortedTable = [finalTable.table[0]].concat(finalTable.table.slice(1).sort((rowA, rowB) => (rowA[compareIndex] || 0) - (rowB[compareIndex] || 0)));
    } else if (extraKeyword === sqlKeywords.ASC || !extraKeyword) {
        sortedTable = [finalTable.table[0]].concat(finalTable.table.slice(1).sort((rowA, rowB) => (rowB[compareIndex] || 0) - (rowA[compareIndex] || 0)));
    }
    finalTable.table = sortedTable;
    return finalTable;
}