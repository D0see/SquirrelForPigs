import { appendColumnToTwoDArr, getColumnByIndexFromTable, getColumnHeadIndex, getColumnValuesByIndexFromTable } from './sqlFunctions.helper.mjs';

export const sqlSelect = (ColumnsHeadersSelected, tableSelected) => {
    const newTable = [[]];
    for (const head of ColumnsHeadersSelected) {
        const colunmIndex = getColumnHeadIndex(head, tableSelected.table);
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
export const sqlLeftJoin = (table1, table2, header1, header2, condOperator) => {

    const newTable = JSON.parse(JSON.stringify(table1.table));
    table2.table[0].forEach(header => newTable[0].push(header));

    const joiningHeaderIndexT1 = getColumnHeadIndex(header1, table1.table);
    const joiningHeaderIndexT2 = getColumnHeadIndex(header2, table2.table);

    table1.table.forEach((row, rowIndex) => {
        if (!rowIndex) return;
        const values = getColumnValuesByIndexFromTable(table2.table, joiningHeaderIndexT2);
        for (const [index, value] of values.entries()) {
            if (row[joiningHeaderIndexT1] === value) {
                newTable[rowIndex].push(...table2.table[index + 1])
            }
        }
    })

    return {
        table : newTable,
        tableName : `${table1.tableName}-${table2.tableName}`
    };
}