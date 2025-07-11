import { appendColumnToTwoDArr, getColumnByIndexFromTable, getColumnHeadIndex, getColumnValuesByIndexFromTable } from './sqlFunctions.helper.mjs';

export const sqlSelect = (ColumnsHeadersSelected, tableSelected) => {
    const newTable = [[]];
    for (const head of ColumnsHeadersSelected) {
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
        tableName : `${table1.tableName}-${table2.tableName}`
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
        tableName : `${table1.tableName}-${table2.tableName}`
    };
}