// ([...values], table) => updatedTable
export const appendColumnToTwoDArr = (values, table) => {
    const newColumnPos = table[0].length;
    for (let y = 0; y < values.length; y++) {
        if (!table[y]) table.push([]);
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
    if (selectedColumnHead === header) {return true;}
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
        if (isPossibleColumnHeadWriting(selectedColumnHead, header)) result.push(colIndex);
    }
    if (result.length > 1) throw new Error('Ambiguous column head : ' + `${selectedColumnHead}`);
    if (result.length === 0) throw new Error('Couldnt find column head : ' + `${selectedColumnHead}`);
    return result[0]; 
}

//#region Data comparison

// TODO : refactor all -> rethink how you do types dummy
export const compareData = (dataTypes, sqlOperatorsJsEquivalent, operator, data1, data2) => {
    if (!data1 || !data2) return;
    
    const leftVal = {
        val : data1,
        type : inferDataType(dataTypes, data1),
    }
    const rightVal = {
        val : data2,
        type : inferDataType(dataTypes, data2),
    }

    if (leftVal.type != rightVal.type) throw new Error('cant compare values of different types');

    if (!sqlOperatorsJsEquivalent[operator]) throw new Error('not a valid comparison operator');

    const jsOperator = sqlOperatorsJsEquivalent[operator];

    switch(leftVal.type) {
        case dataTypes.NUMBER :
            return eval(`${leftVal.val}` + ` ${jsOperator} ` + `${rightVal.val}`);
        case dataTypes.DATETIME :
            return eval(`${Date.parse(leftVal.val)}` + ` ${jsOperator} ` + `${Date.parse(rightVal.val)}`);
        case dataTypes.VARCHAR :
            return eval(`"${leftVal.val}"` + ` ${jsOperator} ` + `"${rightVal.val}"`)
    }
}

export const inferDataType = (dataTypes, param) => {
    if (!isNaN(param)) {
        return dataTypes.NUMBER;
    } else if (isDate(param)) {
        return dataTypes.DATETIME;
    } else {
        return dataTypes.VARCHAR;
    }
}

// yyyy-mm-dd
const isDate = (param) => {
    return (param.length === 10 &&
        !isNaN(param.slice(0, 4)) &&
        param[4] === '-' &&
        !isNaN(param.slice(5, 7)) &&
        param[7] === '-' &&
        !isNaN(param.slice(8, 10))
    ) 
}

//# endregion
