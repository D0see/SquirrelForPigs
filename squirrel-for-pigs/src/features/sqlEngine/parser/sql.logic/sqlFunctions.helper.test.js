import { describe, expect, it } from 'vitest';
import { inferDataType, compareData } from './sqlFunctions.helper.mjs';
import { sqlOperators, sqlOperatorsJsEquivalent, dataTypes, sqlConsts } from '../../utils/sqlConsts.mjs';

 describe(inferDataType.name, () => {
  it("should return dataTypes.NUMBER when the param string contains only digits", () => {
    //ARRANGE
    const param = "123";

    //ACT
    const result = inferDataType(dataTypes, param);

    //ASSERT
    expect(result).toBe(dataTypes.NUMBER)
  }) 
  it("should return dataTypes.DATETIME when the param string is formatted as such 'yyyy-mm-dd'", () => {
    //ARRANGE
    const param = "2024-12-12";

    //ACT
    const result = inferDataType(dataTypes, param);

    //ASSERT
    expect(result).toBe(dataTypes.DATETIME)
  }) 
  it("should return dataTypes.VARCHAR", () => {
    //ARRANGE
    const param = "ramdomStringWithnumbers123and---";

    //ACT
    const result = inferDataType(dataTypes, param);

    //ASSERT
    expect(result).toBe(dataTypes.VARCHAR)
  }) 
})

 describe(compareData.name, () => {
  it("should throw an error if leftData & rightData arent the same type", () => {
    //ARRANGE
    const [data1, data2] = ["123","string"];
    const equalOperator = sqlOperators.EQUAL;

    //ACT
    
    //ASSERT
    expect(() => compareData(sqlConsts, sqlOperatorsJsEquivalent, equalOperator, data1, data2)).toThrowError('cant compare values of different types')
  }) 
  it("should throw an error if the operator isnt valid", () => {
    //ARRANGE
    const [data1, data2] = ["alsoastring","string"];
    const operator = "notanoperator";

    //ACT
    
    //ASSERT
    expect(() => compareData(sqlConsts, sqlOperatorsJsEquivalent, operator, data1, data2)).toThrowError('not a valid comparison operator')
  }) 
  it("should return true if values are the same (dates) and operator is =", () => {
    //ARRANGE
    const [data1, data2] = ["2134-12-12","2134-12-12"];
    const equalOperator = sqlOperators.EQUAL;

    //ACT
    const result = compareData(sqlConsts, sqlOperatorsJsEquivalent, equalOperator, data1, data2)

    //ASSERT
    expect(result).toBe(true)
  }) 
  it("should return true if values are the same (numbers) and operator is =", () => {
    //ARRANGE
    const [data1, data2] = ["2134","2134"];
    const equalOperator = sqlOperators.EQUAL;

    //ACT
    const result = compareData(sqlConsts, sqlOperatorsJsEquivalent, equalOperator, data1, data2)

    //ASSERT
    expect(result).toBe(true)
  }) 
  it("should return true if values are the same (strings) and operator is =", () => {
    //ARRANGE
    const [data1, data2] = ["asdasdasdasdasd","asdasdasdasdasd"];
    const equalOperator = sqlOperators.EQUAL;

    //ACT
    const result = compareData(sqlConsts, sqlOperatorsJsEquivalent, equalOperator, data1, data2)

    //ASSERT
    expect(result).toBe(true)
  }) 
})