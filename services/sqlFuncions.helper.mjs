// ([...values], table) => updatedTable
export const appendColumnToTwoDArr = (values, table) => {
    const newColumnPos = table[0].length;
    for (let y = 0; y < values.length; y++) {
        if (!table[y]) {table.push([]);} 
        table[y][newColumnPos] = values[y];
    }
}

// (TwoDArr, columnIndex) => [head, val1, val2, val3...]
export const getColumnByIndexFromTable = (table, columnIndex) => {
    const result = [];
    for (let y = 0; y < table.length; y++) {
        result.push(table[y][columnIndex]);
    }
    return result;
}

// (TwoDArr, columnIndex) => [val1, val2, val3...]
export const getColumnValuesByIndexFromTable = (table, columnIndex) => {
    const result = [];
    for (let y = 1; y < table.length; y++) {
        result.push(table[y][columnIndex]);
    }
    return result;
}


// ("columnHead", [...tables]) => {tabIndex : tableIndex, colIndex : columnIndex}
export const getColumnHeadIndex = (columnHead, table) => {
    const result = [];

    table[0].forEach((header, colIndex) => {
        if (header === columnHead) result.push(
            colIndex
        )
    });

    return result[0];
}