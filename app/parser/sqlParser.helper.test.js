import { describe, expect, it } from 'vitest'
import { findTableInTableArray, findEndIndexOfKeywordQuery, _buildCompositeKeywords, cleanQueryInput, turnRightJoinIntoLeftJoin, tablesAliasesHandler } from './sqlParser.helper.mjs'
import { sqlKeywords, reservedKeyWords, sqlOperators, nextCompositeKeyWordsWord, multipleConditionnalKeyword, equivalentKeywords } from '../utils/keywords.mjs';

const testingData = [{
        table: [
            ['id', 'firstName', 'lastName', 'jobId', 'idManager'],
            ['1', 'John', 'Doe', '1', '2'],
            ['2', 'Jane', 'Doe', '2', undefined],
            ['3', 'Bob', 'Dylan', '3', undefined],
            ['4', 'Cillian', 'Murphy', '4', undefined],
            ['5', 'Jobless', 'Murphy', '1', undefined],
            ['6', 'Alice', 'Smith', '2', '2'],
            ['7', 'Charlie', 'Brown', '3', '3'],
            ['8', 'Emily', 'Jones', '4', '2'],
            ['9', 'George', 'Clark', '1', '1'],
            ['10', 'Hannah', 'Adams', '2', '2'],
            ['11', 'Ivan', 'Petrov', '3', '3'],
            ['12', 'Julia', 'Williams', '4', '4'],
            ['13', 'Kevin', 'Johnson', '1', '1'],
            ['14', 'Laura', 'Martinez', '2', '2'],
            ['15', 'Michael', 'Lee', '3', '3'],
            ['16', 'Nina', 'White', '4', '4'],
            ['17', 'Oscar', 'Hall', '1', '1'],
            ['18', 'Paul', 'Allen', '2', '2'],
            ['19', 'Queen', 'Moore', '3', '3'],
            ['20', 'Rachel', 'Taylor', '4', '4']
        ],
        tableName: 'people'
    },
    {
        table: [
            ['id', 'occupation', 'idSalary'],
            ['1', 'Mason', '1'],
            ['2', 'Plumber', '2'],
            ['3', 'Bouncer', '3'],
            ['4', 'Barman', '1'],
            ['5', 'Electrician', '2'],
            ['6', 'Carpenter', '3'],
            ['7', 'Technician', '2'],
            ['8', 'Engineer', '3'],
            ['9', 'Mechanic', '2'],
            ['10', 'Painter', '1']
        ],
        tableName: 'job'
    },
    {
        table: [
            ['id', 'salary'],
            ['1', '10000'],
            ['2', '15000'],
            ['3', '20000'],
            ['4', '25000'],
            ['5', '30000']
        ],
        tableName: 'salary'
    },
    {
        table: [
            ['id', 'userId', 'product', 'amount', 'createdAt'],
            ['1', '1', 'Laptop', '1200.00', '2023-06-01'],
            ['1', undefined, 'Laptop', '1200.00', '2023-06-01'],
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
            ['15', '2', 'Router', '75.00', '2023-10-30'],
            ['16', '5', 'Power Supply', '95.00', '2023-11-01'],
            ['17', '6', 'RAM', '60.00', '2023-11-02'],
            ['18', '7', 'Desk', '300.00', '2023-11-03'],
            ['19', '8', 'Office Chair', '250.00', '2023-11-04'],
            ['20', '9', 'Notebook', '3.00', '2023-11-05'],
            ['21', '10', 'Pen Pack', '5.00', '2023-11-06'],
            ['22', '11', 'Drawing Tablet', '400.00', '2023-11-07'],
            ['23', '12', 'Headphones', '150.00', '2023-11-08'],
            ['24', '13', 'Webcam', '80.00', '2023-11-09'],
            ['25', '14', 'Laptop Stand', '50.00', '2023-11-10'],
            ['26', '15', 'Micro SD Card', '20.00', '2023-11-11'],
            ['27', '16', 'Portable Monitor', '180.00', '2023-11-12'],
            ['28', '17', 'Gaming Mouse', '65.00', '2023-11-13'],
            ['29', '18', 'Mechanical Keyboard', '130.00', '2023-11-14'],
            ['30', '19', 'Smartwatch', '210.00', '2023-11-15'],
            ['31', '20', 'Router', '85.00', '2023-11-16'],
            ['32', '1', 'Cable Organizer', '15.00', '2023-11-17'],
            ['33', '2', 'Flash Drive', '12.00', '2023-11-18'],
            ['34', '3', 'Bluetooth Speaker', '90.00', '2023-11-19'],
            ['35', '4', 'Laptop Bag', '70.00', '2023-11-20']
        ],
        tableName: 'order'
    }
]

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

//KEYWORDS

describe(_buildCompositeKeywords.name, () => {
  it("functional test 1", () => {
    //ARRANGE
    const words = ['SELECT', '*', 'FROM', 'people', 'LEFT', 'OUTER', 'JOIN', 'job', 'ON', 'people.idJob','=', 'job.id']
    //ACT
    _buildCompositeKeywords(nextCompositeKeyWordsWord, words);
    //ASSERT
    expect(words).toStrictEqual(['SELECT', '*', 'FROM', 'people', 'LEFT OUTER JOIN', 'job', 'ON', 'people.idJob', '=', 'job.id'])
  }) 
})

describe(_buildCompositeKeywords.name, () => {
  it("functional test 2", () => {
    //ARRANGE
    const words = ['RIGHT','OUTER','JOIN', 'LEFT', 'OUTER', 'JOIN']
    //ACT
    _buildCompositeKeywords(nextCompositeKeyWordsWord, words);
    //ASSERT
    expect(words).toStrictEqual(['RIGHT OUTER JOIN', 'LEFT OUTER JOIN'])
  }) 
})

describe(cleanQueryInput.name, () => {
  it("functional test 1", () => {
    //ARRANGE
    const input = "select o.product as product_bought o.amount AS price p.firstName AS client_firstname j1.occupation as client_job s1.salary AS client_salary m.firstName AS manager_firstname m.lastName AS manager_lastname j2.occupation AS manager_job FROM order AS o inner JoiN people AS p on o.userId = p.id LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id left Join job AS j2 on m.jobId = j2.id left join salary AS s1 on j1.idSalary = s1.id LEFT JOIN salary AS s2 on j2.idSalary = s2.id where 'Mason' = j1.occupation"

    //ACT
    const [selectQuery, whereClauseWords] = cleanQueryInput(sqlKeywords, nextCompositeKeyWordsWord, equivalentKeywords, multipleConditionnalKeyword, input);

    //ASSERT
    expect(selectQuery).toStrictEqual(["SELECT","o.product","AS","product_bought","o.amount","AS","price","p.firstName","AS","client_firstname","j1.occupation","AS","client_job","s1.salary","AS","client_salary","m.firstName","AS","manager_firstname","m.lastName","AS","manager_lastname","j2.occupation","AS","manager_job","FROM","order","AS","o","INNER JOIN","people","AS","p","ON","o.userId","=","p.id","LEFT JOIN","people","AS","m","ON","p.idManager","=","m.id","LEFT JOIN","job","AS","j1","ON","p.jobId","=","j1.id","LEFT JOIN","job","AS","j2","ON","m.jobId","=","j2.id","LEFT JOIN","salary","AS","s1","ON","j1.idSalary","=","s1.id","LEFT JOIN","salary","AS","s2","ON","j2.idSalary","=","s2.id"]);
    expect(whereClauseWords).toStrictEqual([["WHERE", "'Mason'", "=", "j1.occupation"]]);
  }) 
})

 describe(cleanQueryInput.name, () => {
  it("should handle commas", () => {
    //ARRANGE
    const input = "select o.product as product_bought, o.amount AS price, p.firstName AS client_firstname, j1.occupation as client_job, s1.salary AS client_salary, m.firstName AS manager_firstname, m.lastName AS manager_lastname, j2.occupation AS manager_job, FROM order AS o inner JoiN people AS p on o.userId = p.id LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id left Join job AS j2 on m.jobId = j2.id left join salary AS s1 on j1.idSalary = s1.id LEFT JOIN salary AS s2 on j2.idSalary = s2.id where 'Mason' = j1.occupation"

    //ACT
    const [selectQuery, whereClauseWords] = cleanQueryInput(sqlKeywords, nextCompositeKeyWordsWord, equivalentKeywords, multipleConditionnalKeyword, input);

    //ASSERT
    expect(selectQuery).toStrictEqual(["SELECT","o.product","AS","product_bought","o.amount","AS","price","p.firstName","AS","client_firstname","j1.occupation","AS","client_job","s1.salary","AS","client_salary","m.firstName","AS","manager_firstname","m.lastName","AS","manager_lastname","j2.occupation","AS","manager_job","FROM","order","AS","o","INNER JOIN","people","AS","p","ON","o.userId","=","p.id","LEFT JOIN","people","AS","m","ON","p.idManager","=","m.id","LEFT JOIN","job","AS","j1","ON","p.jobId","=","j1.id","LEFT JOIN","job","AS","j2","ON","m.jobId","=","j2.id","LEFT JOIN","salary","AS","s1","ON","j1.idSalary","=","s1.id","LEFT JOIN","salary","AS","s2","ON","j2.idSalary","=","s2.id"]);
    expect(whereClauseWords).toStrictEqual([["WHERE", "'Mason'", "=", "j1.occupation"]]);
  }) 
})


describe(turnRightJoinIntoLeftJoin.name, () => {
  it("functional test 1", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'people', 'RIGHT JOIN', 'job', 'on', 'people.idJob', '=', 'job.id'];

    //ACT
    turnRightJoinIntoLeftJoin(sqlKeywords, words);

    //ASSERT
    expect(words).toStrictEqual(['select', '*', 'from', 'job', 'LEFT JOIN', 'people', 'on', 'job.id', '=', 'people.idJob']);
  }) 
})

describe(tablesAliasesHandler.name, () => {
  it("functional test 1", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'people', 'AS', 'p'];
    const tables = structuredClone(testingData);
    const peopleTable = tables.find(table => table.tableName === "people");

    //ACT
    tablesAliasesHandler(sqlKeywords, reservedKeyWords, words, tables)

    //ASSERT
    expect(peopleTable.alias).toBe("p");
  }) 
})

describe(tablesAliasesHandler.name, () => {
  it("should throw an error if a selected from table doesnt exist", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'brouette', 'AS', 'p', 'left join', 'job', 'AS', 'j', 'ON', 'p.idJob', '=', 'j.id'];
    const tables = structuredClone(testingData);

    //ACT

    //ASSERT
    expect(() => tablesAliasesHandler(sqlKeywords, reservedKeyWords, words, tables)).toThrowError("no table with name : brouette");
  }) 
})

describe(tablesAliasesHandler.name, () => {
  it("should throw an error if a table has an invalid alias", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'people', 'AS', 'LEFT JOIN', 'job', 'AS', 'j', 'ON', 'p.idJob', '=', 'j.id'];
    const tables = structuredClone(testingData);

    //ACT

    //ASSERT
    expect(() => tablesAliasesHandler(sqlKeywords, reservedKeyWords, words, tables)).toThrowError("Invalid or absent alias for table : people");
  }) 
})

describe(tablesAliasesHandler.name, () => {
  it("should throw an error if a table has no alias but is affected one", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'people', 'AS', ''];
    const tables = structuredClone(testingData);

    //ACT

    //ASSERT
    expect(() => tablesAliasesHandler(sqlKeywords, reservedKeyWords, words, tables)).toThrowError("Invalid or absent alias for table : people");
  }) 
})


describe(tablesAliasesHandler.name, () => {
  it("should throw an error if two alias are the same", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'people', 'AS', 'p', 'left join', 'job', 'AS', 'p', 'ON', 'p.idJob', '=', 'p.id'];
    const tables = structuredClone(testingData);

    //ACT

    //ASSERT
    expect(() => tablesAliasesHandler(sqlKeywords, reservedKeyWords, words, tables)).toThrowError("Name collision for alias : p");
  }) 
})

describe(tablesAliasesHandler.name, () => {
  it("should create a copy of a table is specified table already has an alias", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'people', 'AS', 'p', 'left join', 'people', 'AS', 'p2', 'ON', 'p.idManager', '=', 'p2.id'];
    const tables = structuredClone(testingData);
    const startingTablesLength = tables.length;

    //ACT
    tablesAliasesHandler(sqlKeywords, reservedKeyWords, words, tables);
    const endingTablesLength = tables.length;
    const peopleTable1 = tables.find(table => table.alias === 'p');
    const peopleTable2 = tables.find(table => table.alias === 'p2');

    //ASSERT
    expect(endingTablesLength).toBe(startingTablesLength + 1);
    expect(peopleTable1.table).toStrictEqual(peopleTable2.table)
  }) 
})

describe(tablesAliasesHandler.name, () => {
  it("should removes the alias affectation from the query", () => {
    //ARRANGE
    const words = ['select', '*', 'from', 'people', 'AS', 'p', 'left join', 'people', 'AS', 'p2', 'ON', 'p.idManager', '=', 'p2.id'];
    const tables = structuredClone(testingData);

    //ACT
    tablesAliasesHandler(sqlKeywords, reservedKeyWords, words, tables);

    //ASSERT
    expect(words).toStrictEqual(['select', '*', 'from', 'p', 'left join', 'p2', 'ON', 'p.idManager', '=', 'p2.id'])
  }) 
})

