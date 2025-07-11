import { describe, expect, it } from 'vitest';
import { SqlParser } from './sqlParser.mjs';

const testingData = {
    people: {
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
    job: {
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
    salary: {
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
}

 describe(SqlParser.name, () => {
  it("LEFTJOIN should pass functionnal test 1", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM people LEFTJOIN job on jobId = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"],["Alice","Plumber"],["Charlie","Bouncer"],["Emily","Barman"],["George","Mason"],["Hannah","Plumber"],["Ivan","Bouncer"],["Julia","Barman"],["Kevin","Mason"],["Laura","Plumber"],["Michael","Bouncer"],["Nina","Barman"],["Oscar","Mason"],["Paul","Plumber"],["Queen","Bouncer"],["Rachel","Barman"]],"tableName":"people-job-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFTJOIN should pass functionnal test 2", () => {
    //ARRANGE
    const query = "SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id LEFTJOIN salary on job.idSalary = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["p.firstName","occupation","salary"],["John","Mason","10000"],["Jane","Plumber","15000"],["Bob","Bouncer","20000"],["Cillian","Barman","10000"],["Jobless","Electrician","15000"],["Alice","Carpenter","20000"],["Charlie","Technician","15000"],["Emily","Engineer","20000"],["George","Mechanic","15000"],["Hannah","Painter","10000"],["Ivan","",""],["Julia","",""],["Kevin","",""],["Laura","",""],["Michael","",""],["Nina","",""],["Oscar","",""],["Paul","",""],["Queen","",""],["Rachel","",""]],"tableName":"people-job-salary-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFTJOIN should pass functionnal test 3", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT p.firstName m.firstName m.lastName FROM people AS p LEFTJOIN people AS m on p.idManager = m.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["p.firstName","m.firstName","m.lastName"],["John","Jane","Doe"],["Jane","",""],["Bob","",""],["Cillian","",""],["Jobless","",""],["Alice","Jane","Doe"],["Charlie","Bob","Dylan"],["Emily","Jane","Doe"],["George","John","Doe"],["Hannah","Jane","Doe"],["Ivan","Bob","Dylan"],["Julia","Cillian","Murphy"],["Kevin","John","Doe"],["Laura","Jane","Doe"],["Michael","Bob","Dylan"],["Nina","Cillian","Murphy"],["Oscar","John","Doe"],["Paul","Jane","Doe"],["Queen","Bob","Dylan"],["Rachel","Cillian","Murphy"]],"tableName":"people-people-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFTJOIN should pass functionnal test 4", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT p.firstName j1.occupation m.firstName m.lastName j2.occupation FROM people AS p LEFTJOIN people AS m on p.idManager = m.id LEFTJOIN job AS j1 on p.jobId = j1.id LEFTJOIN job AS j2 on m.jobId = j2.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["p.firstName","j1.occupation","m.firstName","m.lastName","j2.occupation"],["John","Mason","Jane","Doe","Plumber"],["Jane","Plumber","","",""],["Bob","Bouncer","","",""],["Cillian","Barman","","",""],["Jobless","Mason","","",""],["Alice","Plumber","Jane","Doe","Plumber"],["Charlie","Bouncer","Bob","Dylan","Bouncer"],["Emily","Barman","Jane","Doe","Plumber"],["George","Mason","John","Doe","Mason"],["Hannah","Plumber","Jane","Doe","Plumber"],["Ivan","Bouncer","Bob","Dylan","Bouncer"],["Julia","Barman","Cillian","Murphy","Barman"],["Kevin","Mason","John","Doe","Mason"],["Laura","Plumber","Jane","Doe","Plumber"],["Michael","Bouncer","Bob","Dylan","Bouncer"],["Nina","Barman","Cillian","Murphy","Barman"],["Oscar","Mason","John","Doe","Mason"],["Paul","Plumber","Jane","Doe","Plumber"],["Queen","Bouncer","Bob","Dylan","Bouncer"],["Rachel","Barman","Cillian","Murphy","Barman"]],"tableName":"people-people-job-job-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFTJOIN should pass functionnal test 5", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT o.product o.amount p.firstName j1.occupation s1.salary m.firstName m.lastName j2.occupation FROM order AS o LEFTJOIN people AS p on o.userId = p.id LEFTJOIN people AS m on p.idManager = m.id LEFTJOIN job AS j1 on p.jobId = j1.id LEFTJOIN job AS j2 on m.jobId = j2.id LEFTJOIN salary AS s1 on j1.idSalary = s1.id LEFTJOIN salary AS s2 on j2.idSalary = s2.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["o.product","o.amount","p.firstName","j1.occupation","s1.salary","m.firstName","m.lastName","j2.occupation"],["Laptop","1200.00","John","Mason","10000","Jane","Doe","Plumber"],["Phone","800.00","Jane","Plumber","15000","","",""],["Mouse","25.50","John","Mason","10000","Jane","Doe","Plumber"],["Keyboard","45.00","Bob","Bouncer","20000","","",""],["Monitor","220.00","Cillian","Barman","10000","","",""],["Tablet","600.00","Jane","Plumber","15000","","",""],["Webcam","70.00","Bob","Bouncer","20000","","",""],["Desk Lamp","35.00","John","Mason","10000","Jane","Doe","Plumber"],["Chair","150.00","Cillian","Barman","10000","","",""],["USB Hub","20.00","John","Mason","10000","Jane","Doe","Plumber"],["External HDD","90.00","Jane","Plumber","15000","","",""],["Microphone","130.00","Bob","Bouncer","20000","","",""],["Graphics Tablet","340.00","Cillian","Barman","10000","","",""],["SSD","110.00","John","Mason","10000","Jane","Doe","Plumber"],["Router","75.00","Jane","Plumber","15000","","",""],["Power Supply","95.00","Jobless","Mason","10000","","",""],["RAM","60.00","Alice","Plumber","15000","Jane","Doe","Plumber"],["Desk","300.00","Charlie","Bouncer","20000","Bob","Dylan","Bouncer"],["Office Chair","250.00","Emily","Barman","10000","Jane","Doe","Plumber"],["Notebook","3.00","George","Mason","10000","John","Doe","Mason"],["Pen Pack","5.00","Hannah","Plumber","15000","Jane","Doe","Plumber"],["Drawing Tablet","400.00","Ivan","Bouncer","20000","Bob","Dylan","Bouncer"],["Headphones","150.00","Julia","Barman","10000","Cillian","Murphy","Barman"],["Webcam","80.00","Kevin","Mason","10000","John","Doe","Mason"],["Laptop Stand","50.00","Laura","Plumber","15000","Jane","Doe","Plumber"],["Micro SD Card","20.00","Michael","Bouncer","20000","Bob","Dylan","Bouncer"],["Portable Monitor","180.00","Nina","Barman","10000","Cillian","Murphy","Barman"],["Gaming Mouse","65.00","Oscar","Mason","10000","John","Doe","Mason"],["Mechanical Keyboard","130.00","Paul","Plumber","15000","Jane","Doe","Plumber"],["Smartwatch","210.00","Queen","Bouncer","20000","Bob","Dylan","Bouncer"],["Router","85.00","Rachel","Barman","10000","Cillian","Murphy","Barman"],["Cable Organizer","15.00","John","Mason","10000","Jane","Doe","Plumber"],["Flash Drive","12.00","Jane","Plumber","15000","","",""],["Bluetooth Speaker","90.00","Bob","Bouncer","20000","","",""],["Laptop Bag","70.00","Cillian","Barman","10000","","",""]],"tableName":"order-people-people-job-job-salary-salary-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("RIGHTJOIN should pass functionnal test 6", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM job RIGHTJOIN people on id = jobId";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"],["Alice","Plumber"],["Charlie","Bouncer"],["Emily","Barman"],["George","Mason"],["Hannah","Plumber"],["Ivan","Bouncer"],["Julia","Barman"],["Kevin","Mason"],["Laura","Plumber"],["Michael","Bouncer"],["Nina","Barman"],["Oscar","Mason"],["Paul","Plumber"],["Queen","Bouncer"],["Rachel","Barman"]],"tableName":"people-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("COLUMNSHEADERSALIASES should pass functionnal test 7", () => {
    //ARRANGE
    const query = "SELECT o.product AS product_bought o.amount AS price p.firstName AS client_firstname j1.occupation AS client_job s1.salary AS client_salary m.firstName AS manager_firstname m.lastName AS manager_lastname j2.occupation AS manager_job FROM order AS o LEFTJOIN people AS p on o.userId = p.id LEFTJOIN people AS m on p.idManager = m.id LEFTJOIN job AS j1 on p.jobId = j1.id LEFTJOIN job AS j2 on m.jobId = j2.id LEFTJOIN salary AS s1 on j1.idSalary = s1.id LEFTJOIN salary AS s2 on j2.idSalary = s2.id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["product_bought","price","client_firstname","client_job","client_salary","manager_firstname","manager_lastname","manager_job"],["Laptop","1200.00","John","Mason","10000","Jane","Doe","Plumber"],["Phone","800.00","Jane","Plumber","15000","","",""],["Mouse","25.50","John","Mason","10000","Jane","Doe","Plumber"],["Keyboard","45.00","Bob","Bouncer","20000","","",""],["Monitor","220.00","Cillian","Barman","10000","","",""],["Tablet","600.00","Jane","Plumber","15000","","",""],["Webcam","70.00","Bob","Bouncer","20000","","",""],["Desk Lamp","35.00","John","Mason","10000","Jane","Doe","Plumber"],["Chair","150.00","Cillian","Barman","10000","","",""],["USB Hub","20.00","John","Mason","10000","Jane","Doe","Plumber"],["External HDD","90.00","Jane","Plumber","15000","","",""],["Microphone","130.00","Bob","Bouncer","20000","","",""],["Graphics Tablet","340.00","Cillian","Barman","10000","","",""],["SSD","110.00","John","Mason","10000","Jane","Doe","Plumber"],["Router","75.00","Jane","Plumber","15000","","",""],["Power Supply","95.00","Jobless","Mason","10000","","",""],["RAM","60.00","Alice","Plumber","15000","Jane","Doe","Plumber"],["Desk","300.00","Charlie","Bouncer","20000","Bob","Dylan","Bouncer"],["Office Chair","250.00","Emily","Barman","10000","Jane","Doe","Plumber"],["Notebook","3.00","George","Mason","10000","John","Doe","Mason"],["Pen Pack","5.00","Hannah","Plumber","15000","Jane","Doe","Plumber"],["Drawing Tablet","400.00","Ivan","Bouncer","20000","Bob","Dylan","Bouncer"],["Headphones","150.00","Julia","Barman","10000","Cillian","Murphy","Barman"],["Webcam","80.00","Kevin","Mason","10000","John","Doe","Mason"],["Laptop Stand","50.00","Laura","Plumber","15000","Jane","Doe","Plumber"],["Micro SD Card","20.00","Michael","Bouncer","20000","Bob","Dylan","Bouncer"],["Portable Monitor","180.00","Nina","Barman","10000","Cillian","Murphy","Barman"],["Gaming Mouse","65.00","Oscar","Mason","10000","John","Doe","Mason"],["Mechanical Keyboard","130.00","Paul","Plumber","15000","Jane","Doe","Plumber"],["Smartwatch","210.00","Queen","Bouncer","20000","Bob","Dylan","Bouncer"],["Router","85.00","Rachel","Barman","10000","Cillian","Murphy","Barman"],["Cable Organizer","15.00","John","Mason","10000","Jane","Doe","Plumber"],["Flash Drive","12.00","Jane","Plumber","15000","","",""],["Bluetooth Speaker","90.00","Bob","Bouncer","20000","","",""],["Laptop Bag","70.00","Cillian","Barman","10000","","",""]],"tableName":"order-people-people-job-job-salary-salary-filtered"}')
  }) 
})