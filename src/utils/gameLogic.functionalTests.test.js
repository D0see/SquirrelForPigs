import { describe, expect, it } from 'vitest';
import { validateResult } from './gameLogic';

describe(validateResult.name, () => {
  it("should return true", () => {
    //ARRANGE
    const levelData = {
      'expectedResult' : [['x', 'x'],['a','b'],['a','b']]
    }
    const resultTable = [['x', 'x'],['a','b'],['a','b']];

    //ACT
    const result  = validateResult(levelData, resultTable);

    //ASSERT
    expect(result).toBe(true)
  }) 
  it("should return true", () => {
    //ARRANGE
    const levelData = {
      'expectedResult' : [['x', 'x'],['a','b'],['a','b']]
    }
    const resultTable = [['x', 'x'],['b','a'],['b','a']];

    //ACT
    const result  = validateResult(levelData, resultTable);

    //ASSERT
    expect(result).toBe(true)
  }) 
  it("should return true", () => {
    //ARRANGE
    const levelData = {
      'expectedResult' : [['x', 'x'],['a', 'b'],['b','b'],['c','b']]
    }
    const resultTable = [['x', 'x'],['c', 'b'],['b','b'],['a','b']];

    //ACT
    const result  = validateResult(levelData, resultTable);

    //ASSERT
    expect(result).toBe(true)
  }) 
  it("should return false", () => {
    //ARRANGE
    const levelData = {
      'expectedResult' : [['x', 'x'],['a', 'b'],['b','b'],['c','b']]
    }
    const resultTable = [['x', 'x'],['c', 'z'],['b','b'],['a','b']];

    //ACT
    const result  = validateResult(levelData, resultTable);

    //ASSERT
    expect(result).toBe(false)
  }) 
  it("should throw error too few cols", () => {
    //ARRANGE
    const levelData = {
      'expectedResult' : [['a', 'b'],['a','b'],['a','b']]
    }
    const resultTable = [['a'],['a'],['a']];

    //ACT

    //ASSERT
    expect(() => validateResult(levelData, resultTable)).toThrowError('too few columns in results')
  }) 
  it("should throw error too many cols", () => {
    //ARRANGE
    const levelData = {
      'expectedResult' : [['a', 'b'],['a','b'],['a','b']]
    }
    const resultTable = [['a', 'b', 'c'],['a', 'b', 'c'],['a', 'b', 'c']];

    //ACT

    //ASSERT
    expect(() => validateResult(levelData, resultTable)).toThrowError('too many columns in results')
  }) 
});