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

    console.log(newTable)

    const joiningHeaderIndexT1 = getColumnHeadIndex(table1JoiningHeader, table1);
    const joiningHeaderIndexT2 = getColumnHeadIndex(table2JoiningHeader, table2);
    console.log(joiningHeaderIndexT1, joiningHeaderIndexT2)
    table1.table.forEach((row, rowIndex) => {
        if (!rowIndex) return;
        const values = getColumnValuesByIndexFromTable(table2.table, joiningHeaderIndexT2);
        for (const [index, value] of values.entries()) {
            if (row[joiningHeaderIndexT1] === value) {
                console.log(...table2.table[index + 1])
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