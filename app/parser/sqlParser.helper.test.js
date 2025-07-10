import { describe, expect, it } from 'vitest'
import { findTableInTableArray, findEndIndexOfKeywordQuery } from './sqlParser.helper.mjs'
import { keywords } from '../utils/keywords.mjs';

describe(findTableInTableArray.name, () => {
  it("should return a table with the name specified in the parameters", () => {
    //ARRANGE
    const name = 'test';
    const tableArr = [{tableName: 'hey'}, {tableName: 'hey'}, {tableName: 'test'}, {tableName: 'hey'}];

    //ACT
    const result  = findTableInTableArray(name, tableArr);

    //ASSERT
    expect(result.tableName).toBe(name)
  }) 
  it("should return undefined if no table matching the parameter are found", () => {
    //ARRANGE
    const name = 'test';
    const tableArr = [{tableName: 'hey'}, {tableName: 'hey'}, {tableName: 'hey'}, {tableName: 'hey'}];

    //ACT
    const result  = findTableInTableArray(name, tableArr);

    //ASSERT
    expect(result).toBeUndefined()
  }) 
})

describe(findEndIndexOfKeywordQuery.name, () => {
  it("should return the index of the word in the query just before the next word that appear in keywords", () => {
    //ARRANGE
    const testingQuery = "SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id LEFTJOIN salary on job.idSalary = id".split(" ");
    const startingKeywordIndex = testingQuery.slice(1).findIndex(word => keywords[word]) + 1;

    //ACT
    const result =  findEndIndexOfKeywordQuery(keywords, testingQuery, startingKeywordIndex);

    //ASSERT
    expect(result).toBe(13);
  }) 
  it("should return the query words length - 1 if no other keywords are found", () => {
    //ARRANGE
    const testingQuery = "SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id".split(" ");
    const startingKeywordIndex = testingQuery.slice(1).findIndex(word => keywords[word]) + 1;

    //ACT
    const result =  findEndIndexOfKeywordQuery(keywords, testingQuery, startingKeywordIndex);

    //ASSERT
     expect(result).toBe(13);
  }) 
})