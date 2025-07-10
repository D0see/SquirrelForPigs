import { describe, expect, it } from 'vitest';
import { SqlParser } from './sqlParser.mjs';

const testingData = {
    people : {
        table : [
        ['id', 'firstName', 'lastName', 'jobId', 'idManager'],
        ['1', 'John', 'Doe', '1','2'],
        ['2', 'Jane', 'Doe', '2', undefined],
        ['3', 'Bob', 'Dylan', '3', undefined],
        ['4', 'Cillian', 'Murphy', '4', undefined],
        ['5', 'Jobless', 'Murphy', '1', undefined]
    ], 
        tableName : 'people'
    },
    job : {
        table : [
        ['id', 'occupation', 'idSalary'],
        ['1', 'Mason', '1'],
        ['2', 'Plumber','2'],
        ['3', 'Bouncer','3'],
        ['4', 'Barman', '1'],
    ],
        tableName : "job"
    },
    salary : {
        table : [
        ['id', 'salary'],
        ['1', '10000'],
        ['2', '15000'],
        ['3', '20000'],
    ],
        tableName : "salary"
    },
    order: {
        table: [
            ['id', 'userId', 'product', 'amount', 'createdAt'],
            ['1', '1', 'Laptop', '1200.00', '2023-06-01'],
            ['2', '2', 'Phone', '800.00', '2023-07-01'],
            ['3', '1', 'Mouse', '25.50', '2023-07-15'],
            ['4', '3', 'Keyboard', '45.00', '2023-08-10'],
            ['5', '4', 'Monitor', '220.00', '2023-08-15'],
            ['6', '2', 'Tablet', '600.00', '2023-09-01'],
            ['7', '3', 'Webcam', '70.00', '2023-09-05'],
            ['8', '1', 'Desk Lamp', '35.00', '2023-09-12'],
            ['9', '4', 'Chair', '150.00', '2023-10-01'],
            ['10', '1', 'USB Hub', '20.00', '2023-10-03'],
            ['11', '2', 'External HDD', '90.00', '2023-10-10'],
            ['12', '3', 'Microphone', '130.00', '2023-10-15'],
            ['13', '4', 'Graphics Tablet', '340.00', '2023-10-20'],
            ['14', '1', 'SSD', '110.00', '2023-10-25'],
            ['15', '2', 'Router', '75.00', '2023-10-30']
        ],
        tableName: 'order'
    }
}

 describe(SqlParser.name, () => {
  it("should pass functionnal test 1", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM people LEFTJOIN job on jobId = id";
    const tablesObj = structuredClone(testingData);
    
    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"]],"tableName":"people-job-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("should pass functionnal test 2", () => {
    //ARRANGE
    const query = "SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id LEFTJOIN salary on job.idSalary = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation","salary"],["John","Mason","10000"],["Jane","Plumber","15000"],["Bob","Bouncer","20000"],["Cillian","Barman","10000"],["Jobless","",""]],"tableName":"people-job-salary-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("should pass functionnal test 3", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT p.firstName m.firstName m.lastName FROM people AS p LEFTJOIN people AS m on p.idManager = m.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","firstName","lastName"],["John","Jane","Doe"],["Jane","",""],["Bob","",""],["Cillian","",""],["Jobless","",""]],"tableName":"people-people-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("should pass functionnal test 4", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT p.firstName j1.occupation m.firstName m.lastName j2.occupation FROM people AS p LEFTJOIN people AS m on p.idManager = m.id LEFTJOIN job AS j1 on p.jobId = j1.id LEFTJOIN job AS j2 on m.jobId = j2.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation","firstName","lastName","occupation"],["John","Mason","Jane","Doe","Plumber"],["Jane","Plumber","","",""],["Bob","Bouncer","","",""],["Cillian","Barman","","",""],["Jobless","Mason","","",""]],"tableName":"people-people-job-job-filtered"}')
  }) 
})
