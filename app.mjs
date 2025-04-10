import TableDisplayer from './services/tableDisplayer.mjs'
import testingData from './testing/testingData.mjs';

const body = document.querySelector('main');
body.appendChild(TableDisplayer.twoDArrToHTMLTable(testingData.testTable1.table))

// ("columnHead", [...tables]) => [{tabIndex : tableIndex, colIndex : columnIndex}}
const getColumnHeadPositionInTables = (columnHead, tables) => {
    const result = [];
    tables.forEach((tableObj, tabIndex) => {
        tableObj.table[0].forEach((header, colIndex) => {
            if (header === columnHead) result.push({
                tabIndex,
                colIndex
            })
        });
    });

    //placeholder
    if (result.length > 1) {
        return error("ambiguous query")
        // console.error('ambiguous query')
    } 

    return result[0];
}

//TESTING getColumnHeadMatchInTables
const tables = [testingData.testTable1];
console.log("TESTING getColumnHeadMatchInTables");
const positionObj = getColumnHeadPositionInTables('firstName', tables);
console.log(positionObj);

// (TwoDArr, columnIndex) => [head, val1, val2, val3...]
const getValuesFromColumn = (table, columnIndex) => {
    const result = [];
    for (let y = 0; y < table.length; y++) {
        result.push(table[y][columnIndex]);
    }
    return result;
}

//TESTING getValuesFromColumn
console.log("TESTING getValuesFromColumn");
const values = getValuesFromColumn(tables[positionObj.tabIndex].table, positionObj.colIndex);
console.log(values);

// ([...values], table) => updatedTable
const appendColumnToTwoDArr = (values, table) => {
    const newColumnPos = table[0].length;
    for (let y = 0; y < values.length; y++) {
        if (!table[y]) {table.push([]);} 
        table[y][newColumnPos] = values[y];
    }

}

const selectFunc = (ColumnsHeadersSelected, tablesSelected) => {
    const newTable = [[]];
    for (const head of ColumnsHeadersSelected) {
        const posObj = getColumnHeadPositionInTables(head, tablesSelected);
        const values = getValuesFromColumn(tables[posObj.tabIndex].table, posObj.colIndex);
        appendColumnToTwoDArr(values, newTable);
    }
    return newTable;
}

console.log(
selectFunc(['firstName'], tables));
const selectFirstName = selectFunc(['lastName'], tables)
body.appendChild(TableDisplayer.twoDArrToHTMLTable(selectFirstName))