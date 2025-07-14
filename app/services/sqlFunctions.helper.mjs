// It could be interesting to have a 2D array abstraction, for example a class with the functions below as methods
// Also might be interesting to consider using a matrix computation third party library, or take inspiration from one

// ([...values], table) => updatedTable
export const appendColumnToTwoDArr = (values, table) => {
    const newColumnPos = table[0].length;
    for (let y = 0; y < values.length; y++) {
        if (!table[y]) {table.push([]);} 
        table[y][newColumnPos] = values[y] ?? '';
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
export const getColumnValuesByIndexFromTable = (twoDArr, columnIndex) => {
    const result = [];
    for (let y = 1; y < twoDArr.length; y++) {
        result.push(twoDArr[y][columnIndex]);
    }
    return result;
}

//Checks that the selectedcolumn could be => tableName + '.' + header || table.alias + '.' + header || header
const isPossibleColumnHeadWriting = (selectedColumnHead, header) => {
    const splittedHeader = header.split('.');
    if (splittedHeader[0] === selectedColumnHead) return true;
    for (let i = 1; i < splittedHeader.length; i++) {
        const currHeader = (splittedHeader[i] + '.' + splittedHeader[0]).trim();
        if (currHeader === selectedColumnHead) return true;
    }
    return false;
}

// ("columnHead", [...tables]) => colIndex
export const getColumnHeadIndex = (selectedColumnHead, table) => {
    const result = [];
    for (const [colIndex, header] of table.table[0].entries()) {
        if (isPossibleColumnHeadWriting(selectedColumnHead, header)) {
            result.push(colIndex);
        };
    }
    if (result.length > 1) throw new Error('Ambiguous column head : ' + `${selectedColumnHead}`);
    if (result.length === 0) throw new Error('Couldnt find column head : ' + `${selectedColumnHead}`);
    return result[0]; 
}