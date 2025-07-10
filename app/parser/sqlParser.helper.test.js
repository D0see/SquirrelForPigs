import { describe, expect, it } from 'vitest'
import { findTableInTableArray, findEndIndexOfKeywordQuery, queryAliasesHandler } from './sqlParser.helper.mjs'

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
  it("should throw error if no table matching the parameter is found", () => {
    //ARRANGE
    const name = 'test';
    const tableArr = [{tableName: 'hey'}, {tableName: 'hey'}, {tableName: 'hey'}, {tableName: 'hey'}];

    //ACT

    //ASSERT
    expect(() => findTableInTableArray(name, tableArr)).toThrow(`no table with name : ${name}`)
  }) 
})

describe(findEndIndexOfKeywordQuery.name, () => {
  it("should return the index of the word in the query just before the next word that appear in keywords", () => {
    //ARRANGE
    const keywords = {'LEFTJOIN' : true}
    const testingQuery = "SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id LEFTJOIN salary on job.idSalary = id".split(" ");
    const startingKeywordIndex = testingQuery.slice(1).findIndex(word => keywords[word]) + 1;

    //ACT
    const result =  findEndIndexOfKeywordQuery(keywords, testingQuery, startingKeywordIndex);

    //ASSERT
    expect(result).toBe(13);
  }) 
  it("should return the query words length - 1 if no other keywords are found", () => {
    //ARRANGE
    const keywords = {'LEFTJOIN' : true}
    const testingQuery = "SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id".split(" ");
    const startingKeywordIndex = testingQuery.slice(1).findIndex(word => keywords[word]) + 1;

    //ACT
    const result =  findEndIndexOfKeywordQuery(keywords, testingQuery, startingKeywordIndex);

    //ASSERT
    expect(result).toBe(13);
  }) 
})

describe(queryAliasesHandler.name, () => {
  it("", () => {
    //ARRANGE

    //ACT

    //ASSERT

  }) 
})