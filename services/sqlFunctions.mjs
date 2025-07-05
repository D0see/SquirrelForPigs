import { appendColumnToTwoDArr, getColumnByIndexFromTable, getColumnHeadIndex, getColumnValuesByIndexFromTable } from './sqlFuncions.helper.mjs';

export const sqlSelect = (ColumnsHeadersSelected, tableSelected) => {
    const newTable = [[]];
    for (const head of ColumnsHeadersSelected) {
        const colunmIndex = getColumnHeadIndex(head, tableSelected.table);
        const values = getColumnByIndexFromTable(tableSelected.table, colunmIndex);
        appendColumnToTwoDArr(values, newTable);
    }
    return newTable;
}

// For a join we first join the whole tables then select the correct headers
export const sqlJoin = (table1, table2, header1, header2, condOperator) => {

    //initalizes newTable
    const newTable = JSON.parse(JSON.stringify(table1.table));
    table2.table[0].forEach(header => newTable[0].push(header));

    const joiningHeaderIndexT1 = getColumnHeadIndex(header1, table1.table);
    const joiningHeaderIndexT2 = getColumnHeadIndex(header2, table2.table);

    table1.table.forEach((row, rowIndex) => {
        if (!rowIndex) return;
        const values = getColumnValuesByIndexFromTable(table2.table, joiningHeaderIndexT2);
        console.log(values);
        for (const [index, value] of values.entries()) {
            console.log(row[joiningHeaderIndexT1], value)
            if (row[joiningHeaderIndexT1] === value) {
                newTable[rowIndex].push(...table2.table[index + 1])
            }
        }
    })
    
    return newTable;

}