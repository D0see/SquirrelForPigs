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
export const getColumnHeadIndex = (sqlConsts, selectedColumnHead, table) => {
    const { sqlErrors } = sqlConsts;

    const result = [];
    for (const [colIndex, header] of table.table[0].entries()) {
        if (isPossibleColumnHeadWriting(selectedColumnHead, header)) result.push(colIndex);
    }
    if (result.length > 1) throw sqlErrors.COLUMN_NAME_AMBIGUOUS(selectedColumnHead);
    if (result.length === 0) throw sqlErrors.COLUMN_NOT_FOUND(selectedColumnHead);
    return result[0]; 
}

//#region Data comparison

// TODO : refactor all -> rethink how you do types dummy
export const compareData = (sqlConsts, sqlOperatorsJsEquivalent, operator, data1, data2) => {
    const { dataTypes, sqlErrors } = sqlConsts;

    if (!data1 || !data2) return;

    const leftVal = {
        val : data1,
        type : inferDataType(dataTypes, data1),
    }
    const rightVal = {
        val : data2,
        type : inferDataType(dataTypes, data2),
    }
    //handles strings TODO : ITS AWFUL FIXFIXFIXFIX
    for (const data of [leftVal, rightVal]) {
        if (data.type === 'VARCHAR' && ["'",'"'].includes(data.val[0]) && ["'",'"'].includes(data.val[data.val.length - 1])) {
            data.val = data.val.slice(1, data.val.length - 1)
        }
    }
    const jsOperator = sqlOperatorsJsEquivalent[operator];

    // //handles null
    // if (leftVal.type === dataTypes.NULL || rightVal.type === dataTypes.NULL) {
    //     return eval(`${leftVal.val}` + ` ${jsOperator} ` + `${rightVal.val}`);
    // }

    if (leftVal.type != rightVal.type && rightVal.type != dataTypes.NULL && leftVal.type != dataTypes.NULL) throw sqlErrors.DIFFERENT_VALUE_TYPES_COMPARISON(leftVal.type, rightVal.type);

    if (!sqlOperatorsJsEquivalent[operator]) throw sqlErrors.INVALID_COMPARISON_OPERATOR(operator);

    switch(leftVal.type) {
        case dataTypes.NUMBER :
            return eval(`${leftVal.val}` + ` ${jsOperator} ` + `${rightVal.val}`);
        case dataTypes.DATETIME :
            return eval(`${Date.parse(leftVal.val).valueOf()}` + ` ${jsOperator} ` + `${Date.parse(rightVal.val).valueOf()}`);
        case dataTypes.VARCHAR :
            return eval(`"${leftVal.val}"` + ` ${jsOperator} ` + `"${rightVal.val}"`)
    }

    if (leftVal.type === dataTypes.NULL || rightVal.type === dataTypes.NULL) {
        return eval(`${leftVal.val}` + ` ${jsOperator} ` + `${rightVal.val}`);
    }
}

export const inferDataType = (dataTypes, param) => {
    if (param === dataTypes.NULL) {
        return dataTypes.NULL;
    } else if (!isNaN(param) && !['"','"'].includes(param[0]) && !['"','"'].includes(param[param.length - 1])) {
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
        !isNaN(param.slice(0, 2)) &&
        param[2] === '-' &&
        !isNaN(param.slice(3, 5)) &&
        param[5] === '-' &&
        !isNaN(param.slice(6, 10))
    ) 
}

//# endregion
