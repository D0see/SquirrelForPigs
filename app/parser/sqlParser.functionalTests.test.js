import { describe, expect, it } from 'vitest';
import { SqlParser } from './sqlParser.mjs';

const testingData = [{
        table: [
            ['id', 'firstName', 'lastName', 'jobId', 'idManager'],
            ['1', 'John', 'Doe', '1', '2'],
            ['2', 'Jane', 'Doe', '2', 'null'],
            ['3', 'Bob', 'Dylan', '3', 'null'],
            ['4', 'Cillian', 'Murphy', '4', 'null'],
            ['5', 'Jobless', 'Murphy', '1', 'null'],
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
            ['1', 'null', 'Laptop', '1200.00', '2023-06-01'],
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
        tableName: 'commande'
    }
]

 describe(SqlParser.name, () => {
  it("LEFT JOIN -- 1", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM people LEFT JOIN job on jobId = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"],["Alice","Plumber"],["Charlie","Bouncer"],["Emily","Barman"],["George","Mason"],["Hannah","Plumber"],["Ivan","Bouncer"],["Julia","Barman"],["Kevin","Mason"],["Laura","Plumber"],["Michael","Bouncer"],["Nina","Barman"],["Oscar","Mason"],["Paul","Plumber"],["Queen","Bouncer"],["Rachel","Barman"]],"tableName":"people-job-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFT JOIN -- 2", () => {
    //ARRANGE
    const query = "SELECT firstName occupation salary FROM people AS p LEFT JOIN job on p.jobId = job.id LEFT JOIN salary on job.idSalary = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["p.firstName","occupation","salary"],["John","Mason","10000"],["Jane","Plumber","15000"],["Bob","Bouncer","20000"],["Cillian","Barman","10000"],["Jobless","Mason","10000"],["Alice","Plumber","15000"],["Charlie","Bouncer","20000"],["Emily","Barman","10000"],["George","Mason","10000"],["Hannah","Plumber","15000"],["Ivan","Bouncer","20000"],["Julia","Barman","10000"],["Kevin","Mason","10000"],["Laura","Plumber","15000"],["Michael","Bouncer","20000"],["Nina","Barman","10000"],["Oscar","Mason","10000"],["Paul","Plumber","15000"],["Queen","Bouncer","20000"],["Rachel","Barman","10000"]],"tableName":"p-job-salary-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFT JOIN -- 3", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT p.firstName m.firstName m.lastName FROM people AS p LEFT JOIN people AS m on p.idManager = m.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["p.firstName","m.firstName","m.lastName"],["John","Jane","Doe"],["Jane","null","null"],["Bob","null","null"],["Cillian","null","null"],["Jobless","null","null"],["Alice","Jane","Doe"],["Charlie","Bob","Dylan"],["Emily","Jane","Doe"],["George","John","Doe"],["Hannah","Jane","Doe"],["Ivan","Bob","Dylan"],["Julia","Cillian","Murphy"],["Kevin","John","Doe"],["Laura","Jane","Doe"],["Michael","Bob","Dylan"],["Nina","Cillian","Murphy"],["Oscar","John","Doe"],["Paul","Jane","Doe"],["Queen","Bob","Dylan"],["Rachel","Cillian","Murphy"]],"tableName":"p-m-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFT JOIN -- 4", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT p.firstName j1.occupation m.firstName m.lastName j2.occupation FROM people AS p LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id LEFT JOIN job AS j2 on m.jobId = j2.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["p.firstName","j1.occupation","m.firstName","m.lastName","j2.occupation"],["John","Mason","Jane","Doe","Plumber"],["Jane","Plumber","null","null","null"],["Bob","Bouncer","null","null","null"],["Cillian","Barman","null","null","null"],["Jobless","Mason","null","null","null"],["Alice","Plumber","Jane","Doe","Plumber"],["Charlie","Bouncer","Bob","Dylan","Bouncer"],["Emily","Barman","Jane","Doe","Plumber"],["George","Mason","John","Doe","Mason"],["Hannah","Plumber","Jane","Doe","Plumber"],["Ivan","Bouncer","Bob","Dylan","Bouncer"],["Julia","Barman","Cillian","Murphy","Barman"],["Kevin","Mason","John","Doe","Mason"],["Laura","Plumber","Jane","Doe","Plumber"],["Michael","Bouncer","Bob","Dylan","Bouncer"],["Nina","Barman","Cillian","Murphy","Barman"],["Oscar","Mason","John","Doe","Mason"],["Paul","Plumber","Jane","Doe","Plumber"],["Queen","Bouncer","Bob","Dylan","Bouncer"],["Rachel","Barman","Cillian","Murphy","Barman"]],"tableName":"p-m-j1-j2-filtered"}')
  }) 
})

describe(SqlParser.name, () => {
  it("LEFT JOIN -- 5", () => {
    //ARRANGE
    const tablesObj = structuredClone(testingData);
    const query = "SELECT o.product o.amount p.firstName j1.occupation s1.salary m.firstName m.lastName j2.occupation FROM commande AS o LEFT JOIN people AS p on o.userId = p.id LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id LEFT JOIN job AS j2 on m.jobId = j2.id LEFT JOIN salary AS s1 on j1.idSalary = s1.id LEFT JOIN salary AS s2 on j2.idSalary = s2.id";

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["o.product","o.amount","p.firstName","j1.occupation","s1.salary","m.firstName","m.lastName","j2.occupation"],["Laptop","1200.00","John","Mason","10000","Jane","Doe","Plumber"],["Laptop","1200.00","null","null","null","null","null","null"],["Phone","800.00","Jane","Plumber","15000","null","null","null"],["Mouse","25.50","John","Mason","10000","Jane","Doe","Plumber"],["Keyboard","45.00","Bob","Bouncer","20000","null","null","null"],["Monitor","220.00","Cillian","Barman","10000","null","null","null"],["Tablet","600.00","Jane","Plumber","15000","null","null","null"],["Webcam","70.00","Bob","Bouncer","20000","null","null","null"],["Desk Lamp","35.00","John","Mason","10000","Jane","Doe","Plumber"],["Chair","150.00","Cillian","Barman","10000","null","null","null"],["USB Hub","20.00","John","Mason","10000","Jane","Doe","Plumber"],["External HDD","90.00","Jane","Plumber","15000","null","null","null"],["Microphone","130.00","Bob","Bouncer","20000","null","null","null"],["Graphics Tablet","340.00","Cillian","Barman","10000","null","null","null"],["SSD","110.00","John","Mason","10000","Jane","Doe","Plumber"],["Router","75.00","Jane","Plumber","15000","null","null","null"],["Power Supply","95.00","Jobless","Mason","10000","null","null","null"],["RAM","60.00","Alice","Plumber","15000","Jane","Doe","Plumber"],["Desk","300.00","Charlie","Bouncer","20000","Bob","Dylan","Bouncer"],["Office Chair","250.00","Emily","Barman","10000","Jane","Doe","Plumber"],["Notebook","3.00","George","Mason","10000","John","Doe","Mason"],["Pen Pack","5.00","Hannah","Plumber","15000","Jane","Doe","Plumber"],["Drawing Tablet","400.00","Ivan","Bouncer","20000","Bob","Dylan","Bouncer"],["Headphones","150.00","Julia","Barman","10000","Cillian","Murphy","Barman"],["Webcam","80.00","Kevin","Mason","10000","John","Doe","Mason"],["Laptop Stand","50.00","Laura","Plumber","15000","Jane","Doe","Plumber"],["Micro SD Card","20.00","Michael","Bouncer","20000","Bob","Dylan","Bouncer"],["Portable Monitor","180.00","Nina","Barman","10000","Cillian","Murphy","Barman"],["Gaming Mouse","65.00","Oscar","Mason","10000","John","Doe","Mason"],["Mechanical Keyboard","130.00","Paul","Plumber","15000","Jane","Doe","Plumber"],["Smartwatch","210.00","Queen","Bouncer","20000","Bob","Dylan","Bouncer"],["Router","85.00","Rachel","Barman","10000","Cillian","Murphy","Barman"],["Cable Organizer","15.00","John","Mason","10000","Jane","Doe","Plumber"],["Flash Drive","12.00","Jane","Plumber","15000","null","null","null"],["Bluetooth Speaker","90.00","Bob","Bouncer","20000","null","null","null"],["Laptop Bag","70.00","Cillian","Barman","10000","null","null","null"]],"tableName":"o-p-m-j1-j2-s1-s2-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("RIGHT JOIN -- 6", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM job RIGHT JOIN people on id = jobId";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"],["Alice","Plumber"],["Charlie","Bouncer"],["Emily","Barman"],["George","Mason"],["Hannah","Plumber"],["Ivan","Bouncer"],["Julia","Barman"],["Kevin","Mason"],["Laura","Plumber"],["Michael","Bouncer"],["Nina","Barman"],["Oscar","Mason"],["Paul","Plumber"],["Queen","Bouncer"],["Rachel","Barman"]],"tableName":"people-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("COLUMNSHEADERSALIASES -- 7", () => {
    //ARRANGE
    const query = "SELECT o.product AS product_bought o.amount AS price p.firstName AS client_firstname j1.occupation AS client_job s1.salary AS client_salary m.firstName AS manager_firstname m.lastName AS manager_lastname j2.occupation AS manager_job FROM commande AS o LEFT JOIN people AS p on o.userId = p.id LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id LEFT JOIN job AS j2 on m.jobId = j2.id LEFT JOIN salary AS s1 on j1.idSalary = s1.id LEFT JOIN salary AS s2 on j2.idSalary = s2.id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["product_bought","price","client_firstname","client_job","client_salary","manager_firstname","manager_lastname","manager_job"],["Laptop","1200.00","John","Mason","10000","Jane","Doe","Plumber"],["Laptop","1200.00","null","null","null","null","null","null"],["Phone","800.00","Jane","Plumber","15000","null","null","null"],["Mouse","25.50","John","Mason","10000","Jane","Doe","Plumber"],["Keyboard","45.00","Bob","Bouncer","20000","null","null","null"],["Monitor","220.00","Cillian","Barman","10000","null","null","null"],["Tablet","600.00","Jane","Plumber","15000","null","null","null"],["Webcam","70.00","Bob","Bouncer","20000","null","null","null"],["Desk Lamp","35.00","John","Mason","10000","Jane","Doe","Plumber"],["Chair","150.00","Cillian","Barman","10000","null","null","null"],["USB Hub","20.00","John","Mason","10000","Jane","Doe","Plumber"],["External HDD","90.00","Jane","Plumber","15000","null","null","null"],["Microphone","130.00","Bob","Bouncer","20000","null","null","null"],["Graphics Tablet","340.00","Cillian","Barman","10000","null","null","null"],["SSD","110.00","John","Mason","10000","Jane","Doe","Plumber"],["Router","75.00","Jane","Plumber","15000","null","null","null"],["Power Supply","95.00","Jobless","Mason","10000","null","null","null"],["RAM","60.00","Alice","Plumber","15000","Jane","Doe","Plumber"],["Desk","300.00","Charlie","Bouncer","20000","Bob","Dylan","Bouncer"],["Office Chair","250.00","Emily","Barman","10000","Jane","Doe","Plumber"],["Notebook","3.00","George","Mason","10000","John","Doe","Mason"],["Pen Pack","5.00","Hannah","Plumber","15000","Jane","Doe","Plumber"],["Drawing Tablet","400.00","Ivan","Bouncer","20000","Bob","Dylan","Bouncer"],["Headphones","150.00","Julia","Barman","10000","Cillian","Murphy","Barman"],["Webcam","80.00","Kevin","Mason","10000","John","Doe","Mason"],["Laptop Stand","50.00","Laura","Plumber","15000","Jane","Doe","Plumber"],["Micro SD Card","20.00","Michael","Bouncer","20000","Bob","Dylan","Bouncer"],["Portable Monitor","180.00","Nina","Barman","10000","Cillian","Murphy","Barman"],["Gaming Mouse","65.00","Oscar","Mason","10000","John","Doe","Mason"],["Mechanical Keyboard","130.00","Paul","Plumber","15000","Jane","Doe","Plumber"],["Smartwatch","210.00","Queen","Bouncer","20000","Bob","Dylan","Bouncer"],["Router","85.00","Rachel","Barman","10000","Cillian","Murphy","Barman"],["Cable Organizer","15.00","John","Mason","10000","Jane","Doe","Plumber"],["Flash Drive","12.00","Jane","Plumber","15000","null","null","null"],["Bluetooth Speaker","90.00","Bob","Bouncer","20000","null","null","null"],["Laptop Bag","70.00","Cillian","Barman","10000","null","null","null"]],"tableName":"o-p-m-j1-j2-s1-s2-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("INNER JOIN -- 8", () => {
    //ARRANGE
    const query = "SELECT o.product AS product_bought o.amount AS price p.firstName AS client_firstname j1.occupation AS client_job s1.salary AS client_salary m.firstName AS manager_firstname m.lastName AS manager_lastname j2.occupation AS manager_job FROM commande AS o INNER JOIN people AS p on o.userId = p.id LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id LEFT JOIN job AS j2 on m.jobId = j2.id LEFT JOIN salary AS s1 on j1.idSalary = s1.id LEFT JOIN salary AS s2 on j2.idSalary = s2.id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["product_bought","price","client_firstname","client_job","client_salary","manager_firstname","manager_lastname","manager_job"],["Laptop","1200.00","John","Mason","10000","Jane","Doe","Plumber"],["Phone","800.00","Jane","Plumber","15000","null","null","null"],["Mouse","25.50","John","Mason","10000","Jane","Doe","Plumber"],["Keyboard","45.00","Bob","Bouncer","20000","null","null","null"],["Monitor","220.00","Cillian","Barman","10000","null","null","null"],["Tablet","600.00","Jane","Plumber","15000","null","null","null"],["Webcam","70.00","Bob","Bouncer","20000","null","null","null"],["Desk Lamp","35.00","John","Mason","10000","Jane","Doe","Plumber"],["Chair","150.00","Cillian","Barman","10000","null","null","null"],["USB Hub","20.00","John","Mason","10000","Jane","Doe","Plumber"],["External HDD","90.00","Jane","Plumber","15000","null","null","null"],["Microphone","130.00","Bob","Bouncer","20000","null","null","null"],["Graphics Tablet","340.00","Cillian","Barman","10000","null","null","null"],["SSD","110.00","John","Mason","10000","Jane","Doe","Plumber"],["Router","75.00","Jane","Plumber","15000","null","null","null"],["Power Supply","95.00","Jobless","Mason","10000","null","null","null"],["RAM","60.00","Alice","Plumber","15000","Jane","Doe","Plumber"],["Desk","300.00","Charlie","Bouncer","20000","Bob","Dylan","Bouncer"],["Office Chair","250.00","Emily","Barman","10000","Jane","Doe","Plumber"],["Notebook","3.00","George","Mason","10000","John","Doe","Mason"],["Pen Pack","5.00","Hannah","Plumber","15000","Jane","Doe","Plumber"],["Drawing Tablet","400.00","Ivan","Bouncer","20000","Bob","Dylan","Bouncer"],["Headphones","150.00","Julia","Barman","10000","Cillian","Murphy","Barman"],["Webcam","80.00","Kevin","Mason","10000","John","Doe","Mason"],["Laptop Stand","50.00","Laura","Plumber","15000","Jane","Doe","Plumber"],["Micro SD Card","20.00","Michael","Bouncer","20000","Bob","Dylan","Bouncer"],["Portable Monitor","180.00","Nina","Barman","10000","Cillian","Murphy","Barman"],["Gaming Mouse","65.00","Oscar","Mason","10000","John","Doe","Mason"],["Mechanical Keyboard","130.00","Paul","Plumber","15000","Jane","Doe","Plumber"],["Smartwatch","210.00","Queen","Bouncer","20000","Bob","Dylan","Bouncer"],["Router","85.00","Rachel","Barman","10000","Cillian","Murphy","Barman"],["Cable Organizer","15.00","John","Mason","10000","Jane","Doe","Plumber"],["Flash Drive","12.00","Jane","Plumber","15000","null","null","null"],["Bluetooth Speaker","90.00","Bob","Bouncer","20000","null","null","null"],["Laptop Bag","70.00","Cillian","Barman","10000","null","null","null"]],"tableName":"o-p-m-j1-j2-s1-s2-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("POORLY WRITTEN INPUT : BADCASING -- 9", () => {
    //ARRANGE
    const query = "select o.product as product_bought o.amount AS price p.firstName AS client_firstname j1.occupation as client_job s1.salary AS client_salary m.firstName AS manager_firstname m.lastName AS manager_lastname j2.occupation AS manager_job FROM commande AS o inner JoiN people AS p on o.userId = p.id LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id left Join job AS j2 on m.jobId = j2.id left join salary AS s1 on j1.idSalary = s1.id LEFT JOIN salary AS s2 on j2.idSalary = s2.id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["product_bought","price","client_firstname","client_job","client_salary","manager_firstname","manager_lastname","manager_job"],["Laptop","1200.00","John","Mason","10000","Jane","Doe","Plumber"],["Phone","800.00","Jane","Plumber","15000","null","null","null"],["Mouse","25.50","John","Mason","10000","Jane","Doe","Plumber"],["Keyboard","45.00","Bob","Bouncer","20000","null","null","null"],["Monitor","220.00","Cillian","Barman","10000","null","null","null"],["Tablet","600.00","Jane","Plumber","15000","null","null","null"],["Webcam","70.00","Bob","Bouncer","20000","null","null","null"],["Desk Lamp","35.00","John","Mason","10000","Jane","Doe","Plumber"],["Chair","150.00","Cillian","Barman","10000","null","null","null"],["USB Hub","20.00","John","Mason","10000","Jane","Doe","Plumber"],["External HDD","90.00","Jane","Plumber","15000","null","null","null"],["Microphone","130.00","Bob","Bouncer","20000","null","null","null"],["Graphics Tablet","340.00","Cillian","Barman","10000","null","null","null"],["SSD","110.00","John","Mason","10000","Jane","Doe","Plumber"],["Router","75.00","Jane","Plumber","15000","null","null","null"],["Power Supply","95.00","Jobless","Mason","10000","null","null","null"],["RAM","60.00","Alice","Plumber","15000","Jane","Doe","Plumber"],["Desk","300.00","Charlie","Bouncer","20000","Bob","Dylan","Bouncer"],["Office Chair","250.00","Emily","Barman","10000","Jane","Doe","Plumber"],["Notebook","3.00","George","Mason","10000","John","Doe","Mason"],["Pen Pack","5.00","Hannah","Plumber","15000","Jane","Doe","Plumber"],["Drawing Tablet","400.00","Ivan","Bouncer","20000","Bob","Dylan","Bouncer"],["Headphones","150.00","Julia","Barman","10000","Cillian","Murphy","Barman"],["Webcam","80.00","Kevin","Mason","10000","John","Doe","Mason"],["Laptop Stand","50.00","Laura","Plumber","15000","Jane","Doe","Plumber"],["Micro SD Card","20.00","Michael","Bouncer","20000","Bob","Dylan","Bouncer"],["Portable Monitor","180.00","Nina","Barman","10000","Cillian","Murphy","Barman"],["Gaming Mouse","65.00","Oscar","Mason","10000","John","Doe","Mason"],["Mechanical Keyboard","130.00","Paul","Plumber","15000","Jane","Doe","Plumber"],["Smartwatch","210.00","Queen","Bouncer","20000","Bob","Dylan","Bouncer"],["Router","85.00","Rachel","Barman","10000","Cillian","Murphy","Barman"],["Cable Organizer","15.00","John","Mason","10000","Jane","Doe","Plumber"],["Flash Drive","12.00","Jane","Plumber","15000","null","null","null"],["Bluetooth Speaker","90.00","Bob","Bouncer","20000","null","null","null"],["Laptop Bag","70.00","Cillian","Barman","10000","null","null","null"]],"tableName":"o-p-m-j1-j2-s1-s2-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("LEFT OUTER JOIN -- 10", () => {
    //ARRANGE
    const query = "select firstName lastName job.occupation from people LEFT OUTER JOIN job on people.jobId = job.id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","lastName","occupation"],["John","Doe","Mason"],["Jane","Doe","Plumber"],["Bob","Dylan","Bouncer"],["Cillian","Murphy","Barman"],["Jobless","Murphy","Mason"],["Alice","Smith","Plumber"],["Charlie","Brown","Bouncer"],["Emily","Jones","Barman"],["George","Clark","Mason"],["Hannah","Adams","Plumber"],["Ivan","Petrov","Bouncer"],["Julia","Williams","Barman"],["Kevin","Johnson","Mason"],["Laura","Martinez","Plumber"],["Michael","Lee","Bouncer"],["Nina","White","Barman"],["Oscar","Hall","Mason"],["Paul","Allen","Plumber"],["Queen","Moore","Bouncer"],["Rachel","Taylor","Barman"]],"tableName":"people-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("RIGHT OUTER JOIN -- 11", () => {
    //ARRANGE
    const query = "select firstName lastName job.occupation from people RIGHT OUTER JOIN job on people.jobId = job.id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","lastName","occupation"],["John","Doe","Mason"],["Jane","Doe","Plumber"],["Bob","Dylan","Bouncer"],["Cillian","Murphy","Barman"],["null","null","Electrician"],["null","null","Carpenter"],["null","null","Technician"],["null","null","Engineer"],["null","null","Mechanic"],["null","null","Painter"]],"tableName":"job-people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("SIMPLE QUERY WITH SUBQUERY -- 12", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM (select firstName id jobId from people) LEFT JOIN job on jobId = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"],["Alice","Plumber"],["Charlie","Bouncer"],["Emily","Barman"],["George","Mason"],["Hannah","Plumber"],["Ivan","Bouncer"],["Julia","Barman"],["Kevin","Mason"],["Laura","Plumber"],["Michael","Bouncer"],["Nina","Barman"],["Oscar","Mason"],["Paul","Plumber"],["Queen","Bouncer"],["Rachel","Barman"]],"tableName":"people-filtered-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("SUQUERY WITHIN A SUBQUERY -- 13", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM (select firstName id jobId from (select firstName id jobId from people)) LEFT JOIN job on jobId = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"],["Alice","Plumber"],["Charlie","Bouncer"],["Emily","Barman"],["George","Mason"],["Hannah","Plumber"],["Ivan","Bouncer"],["Julia","Barman"],["Kevin","Mason"],["Laura","Plumber"],["Michael","Bouncer"],["Nina","Barman"],["Oscar","Mason"],["Paul","Plumber"],["Queen","Bouncer"],["Rachel","Barman"]],"tableName":"people-filtered-filtered-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("MULTIPLE SUBQUERIES -- 14", () => {
    //ARRANGE
    const query = "SELECT firstName occupation FROM (select firstName id jobId from people) LEFT JOIN (select occupation id from job) on jobId = id";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","occupation"],["John","Mason"],["Jane","Plumber"],["Bob","Bouncer"],["Cillian","Barman"],["Jobless","Mason"],["Alice","Plumber"],["Charlie","Bouncer"],["Emily","Barman"],["George","Mason"],["Hannah","Plumber"],["Ivan","Bouncer"],["Julia","Barman"],["Kevin","Mason"],["Laura","Plumber"],["Michael","Bouncer"],["Nina","Barman"],["Oscar","Mason"],["Paul","Plumber"],["Queen","Bouncer"],["Rachel","Barman"]],"tableName":"people-filtered-job-filtered-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("KEYWORD * SIMPLE USAGE -- 15", () => {
    //ARRANGE
    const query = "select * from people";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"],["2","Jane","Doe","2","null"],["3","Bob","Dylan","3","null"],["4","Cillian","Murphy","4","null"],["5","Jobless","Murphy","1","null"],["6","Alice","Smith","2","2"],["7","Charlie","Brown","3","3"],["8","Emily","Jones","4","2"],["9","George","Clark","1","1"],["10","Hannah","Adams","2","2"],["11","Ivan","Petrov","3","3"],["12","Julia","Williams","4","4"],["13","Kevin","Johnson","1","1"],["14","Laura","Martinez","2","2"],["15","Michael","Lee","3","3"],["16","Nina","White","4","4"],["17","Oscar","Hall","1","1"],["18","Paul","Allen","2","2"],["19","Queen","Moore","3","3"],["20","Rachel","Taylor","4","4"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("KEYWORD * WITH EXTRA COLUMN NAMES -- 16", () => {
    //ARRANGE
    const query = "select * firstName lastName from people";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager","firstName","lastName"],["1","John","Doe","1","2","John","Doe"],["2","Jane","Doe","2","null","Jane","Doe"],["3","Bob","Dylan","3","null","Bob","Dylan"],["4","Cillian","Murphy","4","null","Cillian","Murphy"],["5","Jobless","Murphy","1","null","Jobless","Murphy"],["6","Alice","Smith","2","2","Alice","Smith"],["7","Charlie","Brown","3","3","Charlie","Brown"],["8","Emily","Jones","4","2","Emily","Jones"],["9","George","Clark","1","1","George","Clark"],["10","Hannah","Adams","2","2","Hannah","Adams"],["11","Ivan","Petrov","3","3","Ivan","Petrov"],["12","Julia","Williams","4","4","Julia","Williams"],["13","Kevin","Johnson","1","1","Kevin","Johnson"],["14","Laura","Martinez","2","2","Laura","Martinez"],["15","Michael","Lee","3","3","Michael","Lee"],["16","Nina","White","4","4","Nina","White"],["17","Oscar","Hall","1","1","Oscar","Hall"],["18","Paul","Allen","2","2","Paul","Allen"],["19","Queen","Moore","3","3","Queen","Moore"],["20","Rachel","Taylor","4","4","Rachel","Taylor"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("SIMPLE WHERE CLAUSE COLUMN = 'STRING' -- 17", () => {
    //ARRANGE
    const query = "select * from people where lastName = 'Doe'";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"],["2","Jane","Doe","2","null"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("SIMPLE WHERE CLAUSE 'STRING' = COLUMN -- 18", () => {
    //ARRANGE
    const query = "select * from people where 'Doe' = lastName";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"],["2","Jane","Doe","2","null"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("SIMPLE WHERE CLAUSE COLUMN1 = COLUMN2 -- 19", () => {
    //ARRANGE
    const query = "select * from people where jobId = idManager";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["6","Alice","Smith","2","2"],["7","Charlie","Brown","3","3"],["9","George","Clark","1","1"],["10","Hannah","Adams","2","2"],["11","Ivan","Petrov","3","3"],["12","Julia","Williams","4","4"],["13","Kevin","Johnson","1","1"],["14","Laura","Martinez","2","2"],["15","Michael","Lee","3","3"],["16","Nina","White","4","4"],["17","Oscar","Hall","1","1"],["18","Paul","Allen","2","2"],["19","Queen","Moore","3","3"],["20","Rachel","Taylor","4","4"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("SIMPLE WHERE CLAUSE 'string' = 'string' -- 20", () => {
    //ARRANGE
    const query = "select * from people where '1' = '1'";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"],["2","Jane","Doe","2","null"],["3","Bob","Dylan","3","null"],["4","Cillian","Murphy","4","null"],["5","Jobless","Murphy","1","null"],["6","Alice","Smith","2","2"],["7","Charlie","Brown","3","3"],["8","Emily","Jones","4","2"],["9","George","Clark","1","1"],["10","Hannah","Adams","2","2"],["11","Ivan","Petrov","3","3"],["12","Julia","Williams","4","4"],["13","Kevin","Johnson","1","1"],["14","Laura","Martinez","2","2"],["15","Michael","Lee","3","3"],["16","Nina","White","4","4"],["17","Oscar","Hall","1","1"],["18","Paul","Allen","2","2"],["19","Queen","Moore","3","3"],["20","Rachel","Taylor","4","4"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("MULTIPLE JOIN QUERY WITH WHERE CLAUSE -- 21", () => {
    //ARRANGE
    const query = "select o.product as product_bought o.amount AS price p.firstName AS client_firstname j1.occupation as client_job s1.salary AS client_salary m.firstName AS manager_firstname m.lastName AS manager_lastname j2.occupation AS manager_job FROM commande AS o inner JoiN people AS p on o.userId = p.id LEFT JOIN people AS m on p.idManager = m.id LEFT JOIN job AS j1 on p.jobId = j1.id left Join job AS j2 on m.jobId = j2.id left join salary AS s1 on j1.idSalary = s1.id LEFT JOIN salary AS s2 on j2.idSalary = s2.id where 'Mason' = j1.occupation";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["product_bought","price","client_firstname","client_job","client_salary","manager_firstname","manager_lastname","manager_job"],["Laptop","1200.00","John","Mason","10000","Jane","Doe","Plumber"],["Mouse","25.50","John","Mason","10000","Jane","Doe","Plumber"],["Desk Lamp","35.00","John","Mason","10000","Jane","Doe","Plumber"],["USB Hub","20.00","John","Mason","10000","Jane","Doe","Plumber"],["SSD","110.00","John","Mason","10000","Jane","Doe","Plumber"],["Power Supply","95.00","Jobless","Mason","10000","null","null","null"],["Notebook","3.00","George","Mason","10000","John","Doe","Mason"],["Webcam","80.00","Kevin","Mason","10000","John","Doe","Mason"],["Gaming Mouse","65.00","Oscar","Mason","10000","John","Doe","Mason"],["Cable Organizer","15.00","John","Mason","10000","Jane","Doe","Plumber"]],"tableName":"o-p-m-j1-j2-s1-s2-filtered"}')
  }) 
})
 describe(SqlParser.name, () => {
  it("SIMPLE QUERY WITH WHERE CLAUSE = COLUMN EQUAL STRING PRESENT IN COLUMN -- 22", () => {
    //ARRANGE
    const query = "select people.id firstName occupation from people left join job on people.jobId = job.id where occupation = 'Barman'";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","occupation"],["4","Cillian","Barman"],["8","Emily","Barman"],["12","Julia","Barman"],["16","Nina","Barman"],["20","Rachel","Barman"]],"tableName":"people-job-filtered"}')
  }) 
})
 describe(SqlParser.name, () => {
  it("SIMPLE QUERY WITH WHERE CLAUSE = COLUMN EQUAL NUMBER PRESENT IN COLUMN -- 23", () => {
    //ARRANGE
    const query = "select people.id firstName occupation from people left join job on people.jobId = job.id where people.id = 10";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","occupation"],["10","Hannah","Plumber"]],"tableName":"people-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("SIMPLE QUERY WITH WHERE CLAUSE WHERE COLUMN COMPARED ISNT SELECTED -- 24", () => {
    //ARRANGE
    const query = "select firstName lastName from people where id < 4";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["firstName","lastName"],["John","Doe"],["Jane","Doe"],["Bob","Dylan"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("MULTIPLE WHERE QUERY (WHERE AND) -- 25", () => {
    //ARRANGE
    const query = "select * from people where id < 10 AND lastName = 'Doe' AND firstName = 'John'";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("Poorly written and keyword -- 26", () => {
    //ARRANGE
    const query = "select * from people where id < 10 AnD lastName = 'Doe' and firstName = 'John'";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("JOIN WITH KEYWORD DIFFERENT FROM -- 27", () => {
    //ARRANGE
    const query = "select * from people join commande on people.id != commande.userId";
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager","id","userId","product","amount","createdAt"],["1","John","Doe","1","2","1","null","Laptop","1200.00","2023-06-01"],["1","John","Doe","1","2","2","2","Phone","800.00","2023-07-01"],["1","John","Doe","1","2","4","3","Keyboard","45.00","2023-08-10"],["1","John","Doe","1","2","5","4","Monitor","220.00","2023-08-15"],["1","John","Doe","1","2","6","2","Tablet","600.00","2023-09-01"],["1","John","Doe","1","2","7","3","Webcam","70.00","2023-09-05"],["1","John","Doe","1","2","9","4","Chair","150.00","2023-10-01"],["1","John","Doe","1","2","11","2","External HDD","90.00","2023-10-10"],["1","John","Doe","1","2","12","3","Microphone","130.00","2023-10-15"],["1","John","Doe","1","2","13","4","Graphics Tablet","340.00","2023-10-20"],["1","John","Doe","1","2","15","2","Router","75.00","2023-10-30"],["1","John","Doe","1","2","16","5","Power Supply","95.00","2023-11-01"],["1","John","Doe","1","2","17","6","RAM","60.00","2023-11-02"],["1","John","Doe","1","2","18","7","Desk","300.00","2023-11-03"],["1","John","Doe","1","2","19","8","Office Chair","250.00","2023-11-04"],["1","John","Doe","1","2","20","9","Notebook","3.00","2023-11-05"],["1","John","Doe","1","2","21","10","Pen Pack","5.00","2023-11-06"],["1","John","Doe","1","2","22","11","Drawing Tablet","400.00","2023-11-07"],["1","John","Doe","1","2","23","12","Headphones","150.00","2023-11-08"],["1","John","Doe","1","2","24","13","Webcam","80.00","2023-11-09"],["1","John","Doe","1","2","25","14","Laptop Stand","50.00","2023-11-10"],["1","John","Doe","1","2","26","15","Micro SD Card","20.00","2023-11-11"],["1","John","Doe","1","2","27","16","Portable Monitor","180.00","2023-11-12"],["1","John","Doe","1","2","28","17","Gaming Mouse","65.00","2023-11-13"],["1","John","Doe","1","2","29","18","Mechanical Keyboard","130.00","2023-11-14"],["1","John","Doe","1","2","30","19","Smartwatch","210.00","2023-11-15"],["1","John","Doe","1","2","31","20","Router","85.00","2023-11-16"],["1","John","Doe","1","2","33","2","Flash Drive","12.00","2023-11-18"],["1","John","Doe","1","2","34","3","Bluetooth Speaker","90.00","2023-11-19"],["1","John","Doe","1","2","35","4","Laptop Bag","70.00","2023-11-20"],["2","Jane","Doe","2","null","1","1","Laptop","1200.00","2023-06-01"],["2","Jane","Doe","2","null","1","null","Laptop","1200.00","2023-06-01"],["2","Jane","Doe","2","null","3","1","Mouse","25.50","2023-07-15"],["2","Jane","Doe","2","null","4","3","Keyboard","45.00","2023-08-10"],["2","Jane","Doe","2","null","5","4","Monitor","220.00","2023-08-15"],["2","Jane","Doe","2","null","7","3","Webcam","70.00","2023-09-05"],["2","Jane","Doe","2","null","8","1","Desk Lamp","35.00","2023-09-12"],["2","Jane","Doe","2","null","9","4","Chair","150.00","2023-10-01"],["2","Jane","Doe","2","null","10","1","USB Hub","20.00","2023-10-03"],["2","Jane","Doe","2","null","12","3","Microphone","130.00","2023-10-15"],["2","Jane","Doe","2","null","13","4","Graphics Tablet","340.00","2023-10-20"],["2","Jane","Doe","2","null","14","1","SSD","110.00","2023-10-25"],["2","Jane","Doe","2","null","16","5","Power Supply","95.00","2023-11-01"],["2","Jane","Doe","2","null","17","6","RAM","60.00","2023-11-02"],["2","Jane","Doe","2","null","18","7","Desk","300.00","2023-11-03"],["2","Jane","Doe","2","null","19","8","Office Chair","250.00","2023-11-04"],["2","Jane","Doe","2","null","20","9","Notebook","3.00","2023-11-05"],["2","Jane","Doe","2","null","21","10","Pen Pack","5.00","2023-11-06"],["2","Jane","Doe","2","null","22","11","Drawing Tablet","400.00","2023-11-07"],["2","Jane","Doe","2","null","23","12","Headphones","150.00","2023-11-08"],["2","Jane","Doe","2","null","24","13","Webcam","80.00","2023-11-09"],["2","Jane","Doe","2","null","25","14","Laptop Stand","50.00","2023-11-10"],["2","Jane","Doe","2","null","26","15","Micro SD Card","20.00","2023-11-11"],["2","Jane","Doe","2","null","27","16","Portable Monitor","180.00","2023-11-12"],["2","Jane","Doe","2","null","28","17","Gaming Mouse","65.00","2023-11-13"],["2","Jane","Doe","2","null","29","18","Mechanical Keyboard","130.00","2023-11-14"],["2","Jane","Doe","2","null","30","19","Smartwatch","210.00","2023-11-15"],["2","Jane","Doe","2","null","31","20","Router","85.00","2023-11-16"],["2","Jane","Doe","2","null","32","1","Cable Organizer","15.00","2023-11-17"],["2","Jane","Doe","2","null","34","3","Bluetooth Speaker","90.00","2023-11-19"],["2","Jane","Doe","2","null","35","4","Laptop Bag","70.00","2023-11-20"],["3","Bob","Dylan","3","null","1","1","Laptop","1200.00","2023-06-01"],["3","Bob","Dylan","3","null","1","null","Laptop","1200.00","2023-06-01"],["3","Bob","Dylan","3","null","2","2","Phone","800.00","2023-07-01"],["3","Bob","Dylan","3","null","3","1","Mouse","25.50","2023-07-15"],["3","Bob","Dylan","3","null","5","4","Monitor","220.00","2023-08-15"],["3","Bob","Dylan","3","null","6","2","Tablet","600.00","2023-09-01"],["3","Bob","Dylan","3","null","8","1","Desk Lamp","35.00","2023-09-12"],["3","Bob","Dylan","3","null","9","4","Chair","150.00","2023-10-01"],["3","Bob","Dylan","3","null","10","1","USB Hub","20.00","2023-10-03"],["3","Bob","Dylan","3","null","11","2","External HDD","90.00","2023-10-10"],["3","Bob","Dylan","3","null","13","4","Graphics Tablet","340.00","2023-10-20"],["3","Bob","Dylan","3","null","14","1","SSD","110.00","2023-10-25"],["3","Bob","Dylan","3","null","15","2","Router","75.00","2023-10-30"],["3","Bob","Dylan","3","null","16","5","Power Supply","95.00","2023-11-01"],["3","Bob","Dylan","3","null","17","6","RAM","60.00","2023-11-02"],["3","Bob","Dylan","3","null","18","7","Desk","300.00","2023-11-03"],["3","Bob","Dylan","3","null","19","8","Office Chair","250.00","2023-11-04"],["3","Bob","Dylan","3","null","20","9","Notebook","3.00","2023-11-05"],["3","Bob","Dylan","3","null","21","10","Pen Pack","5.00","2023-11-06"],["3","Bob","Dylan","3","null","22","11","Drawing Tablet","400.00","2023-11-07"],["3","Bob","Dylan","3","null","23","12","Headphones","150.00","2023-11-08"],["3","Bob","Dylan","3","null","24","13","Webcam","80.00","2023-11-09"],["3","Bob","Dylan","3","null","25","14","Laptop Stand","50.00","2023-11-10"],["3","Bob","Dylan","3","null","26","15","Micro SD Card","20.00","2023-11-11"],["3","Bob","Dylan","3","null","27","16","Portable Monitor","180.00","2023-11-12"],["3","Bob","Dylan","3","null","28","17","Gaming Mouse","65.00","2023-11-13"],["3","Bob","Dylan","3","null","29","18","Mechanical Keyboard","130.00","2023-11-14"],["3","Bob","Dylan","3","null","30","19","Smartwatch","210.00","2023-11-15"],["3","Bob","Dylan","3","null","31","20","Router","85.00","2023-11-16"],["3","Bob","Dylan","3","null","32","1","Cable Organizer","15.00","2023-11-17"],["3","Bob","Dylan","3","null","33","2","Flash Drive","12.00","2023-11-18"],["3","Bob","Dylan","3","null","35","4","Laptop Bag","70.00","2023-11-20"],["4","Cillian","Murphy","4","null","1","1","Laptop","1200.00","2023-06-01"],["4","Cillian","Murphy","4","null","1","null","Laptop","1200.00","2023-06-01"],["4","Cillian","Murphy","4","null","2","2","Phone","800.00","2023-07-01"],["4","Cillian","Murphy","4","null","3","1","Mouse","25.50","2023-07-15"],["4","Cillian","Murphy","4","null","4","3","Keyboard","45.00","2023-08-10"],["4","Cillian","Murphy","4","null","6","2","Tablet","600.00","2023-09-01"],["4","Cillian","Murphy","4","null","7","3","Webcam","70.00","2023-09-05"],["4","Cillian","Murphy","4","null","8","1","Desk Lamp","35.00","2023-09-12"],["4","Cillian","Murphy","4","null","10","1","USB Hub","20.00","2023-10-03"],["4","Cillian","Murphy","4","null","11","2","External HDD","90.00","2023-10-10"],["4","Cillian","Murphy","4","null","12","3","Microphone","130.00","2023-10-15"],["4","Cillian","Murphy","4","null","14","1","SSD","110.00","2023-10-25"],["4","Cillian","Murphy","4","null","15","2","Router","75.00","2023-10-30"],["4","Cillian","Murphy","4","null","16","5","Power Supply","95.00","2023-11-01"],["4","Cillian","Murphy","4","null","17","6","RAM","60.00","2023-11-02"],["4","Cillian","Murphy","4","null","18","7","Desk","300.00","2023-11-03"],["4","Cillian","Murphy","4","null","19","8","Office Chair","250.00","2023-11-04"],["4","Cillian","Murphy","4","null","20","9","Notebook","3.00","2023-11-05"],["4","Cillian","Murphy","4","null","21","10","Pen Pack","5.00","2023-11-06"],["4","Cillian","Murphy","4","null","22","11","Drawing Tablet","400.00","2023-11-07"],["4","Cillian","Murphy","4","null","23","12","Headphones","150.00","2023-11-08"],["4","Cillian","Murphy","4","null","24","13","Webcam","80.00","2023-11-09"],["4","Cillian","Murphy","4","null","25","14","Laptop Stand","50.00","2023-11-10"],["4","Cillian","Murphy","4","null","26","15","Micro SD Card","20.00","2023-11-11"],["4","Cillian","Murphy","4","null","27","16","Portable Monitor","180.00","2023-11-12"],["4","Cillian","Murphy","4","null","28","17","Gaming Mouse","65.00","2023-11-13"],["4","Cillian","Murphy","4","null","29","18","Mechanical Keyboard","130.00","2023-11-14"],["4","Cillian","Murphy","4","null","30","19","Smartwatch","210.00","2023-11-15"],["4","Cillian","Murphy","4","null","31","20","Router","85.00","2023-11-16"],["4","Cillian","Murphy","4","null","32","1","Cable Organizer","15.00","2023-11-17"],["4","Cillian","Murphy","4","null","33","2","Flash Drive","12.00","2023-11-18"],["4","Cillian","Murphy","4","null","34","3","Bluetooth Speaker","90.00","2023-11-19"],["5","Jobless","Murphy","1","null","1","1","Laptop","1200.00","2023-06-01"],["5","Jobless","Murphy","1","null","1","null","Laptop","1200.00","2023-06-01"],["5","Jobless","Murphy","1","null","2","2","Phone","800.00","2023-07-01"],["5","Jobless","Murphy","1","null","3","1","Mouse","25.50","2023-07-15"],["5","Jobless","Murphy","1","null","4","3","Keyboard","45.00","2023-08-10"],["5","Jobless","Murphy","1","null","5","4","Monitor","220.00","2023-08-15"],["5","Jobless","Murphy","1","null","6","2","Tablet","600.00","2023-09-01"],["5","Jobless","Murphy","1","null","7","3","Webcam","70.00","2023-09-05"],["5","Jobless","Murphy","1","null","8","1","Desk Lamp","35.00","2023-09-12"],["5","Jobless","Murphy","1","null","9","4","Chair","150.00","2023-10-01"],["5","Jobless","Murphy","1","null","10","1","USB Hub","20.00","2023-10-03"],["5","Jobless","Murphy","1","null","11","2","External HDD","90.00","2023-10-10"],["5","Jobless","Murphy","1","null","12","3","Microphone","130.00","2023-10-15"],["5","Jobless","Murphy","1","null","13","4","Graphics Tablet","340.00","2023-10-20"],["5","Jobless","Murphy","1","null","14","1","SSD","110.00","2023-10-25"],["5","Jobless","Murphy","1","null","15","2","Router","75.00","2023-10-30"],["5","Jobless","Murphy","1","null","17","6","RAM","60.00","2023-11-02"],["5","Jobless","Murphy","1","null","18","7","Desk","300.00","2023-11-03"],["5","Jobless","Murphy","1","null","19","8","Office Chair","250.00","2023-11-04"],["5","Jobless","Murphy","1","null","20","9","Notebook","3.00","2023-11-05"],["5","Jobless","Murphy","1","null","21","10","Pen Pack","5.00","2023-11-06"],["5","Jobless","Murphy","1","null","22","11","Drawing Tablet","400.00","2023-11-07"],["5","Jobless","Murphy","1","null","23","12","Headphones","150.00","2023-11-08"],["5","Jobless","Murphy","1","null","24","13","Webcam","80.00","2023-11-09"],["5","Jobless","Murphy","1","null","25","14","Laptop Stand","50.00","2023-11-10"],["5","Jobless","Murphy","1","null","26","15","Micro SD Card","20.00","2023-11-11"],["5","Jobless","Murphy","1","null","27","16","Portable Monitor","180.00","2023-11-12"],["5","Jobless","Murphy","1","null","28","17","Gaming Mouse","65.00","2023-11-13"],["5","Jobless","Murphy","1","null","29","18","Mechanical Keyboard","130.00","2023-11-14"],["5","Jobless","Murphy","1","null","30","19","Smartwatch","210.00","2023-11-15"],["5","Jobless","Murphy","1","null","31","20","Router","85.00","2023-11-16"],["5","Jobless","Murphy","1","null","32","1","Cable Organizer","15.00","2023-11-17"],["5","Jobless","Murphy","1","null","33","2","Flash Drive","12.00","2023-11-18"],["5","Jobless","Murphy","1","null","34","3","Bluetooth Speaker","90.00","2023-11-19"],["5","Jobless","Murphy","1","null","35","4","Laptop Bag","70.00","2023-11-20"],["6","Alice","Smith","2","2","1","1","Laptop","1200.00","2023-06-01"],["6","Alice","Smith","2","2","1","null","Laptop","1200.00","2023-06-01"],["6","Alice","Smith","2","2","2","2","Phone","800.00","2023-07-01"],["6","Alice","Smith","2","2","3","1","Mouse","25.50","2023-07-15"],["6","Alice","Smith","2","2","4","3","Keyboard","45.00","2023-08-10"],["6","Alice","Smith","2","2","5","4","Monitor","220.00","2023-08-15"],["6","Alice","Smith","2","2","6","2","Tablet","600.00","2023-09-01"],["6","Alice","Smith","2","2","7","3","Webcam","70.00","2023-09-05"],["6","Alice","Smith","2","2","8","1","Desk Lamp","35.00","2023-09-12"],["6","Alice","Smith","2","2","9","4","Chair","150.00","2023-10-01"],["6","Alice","Smith","2","2","10","1","USB Hub","20.00","2023-10-03"],["6","Alice","Smith","2","2","11","2","External HDD","90.00","2023-10-10"],["6","Alice","Smith","2","2","12","3","Microphone","130.00","2023-10-15"],["6","Alice","Smith","2","2","13","4","Graphics Tablet","340.00","2023-10-20"],["6","Alice","Smith","2","2","14","1","SSD","110.00","2023-10-25"],["6","Alice","Smith","2","2","15","2","Router","75.00","2023-10-30"],["6","Alice","Smith","2","2","16","5","Power Supply","95.00","2023-11-01"],["6","Alice","Smith","2","2","18","7","Desk","300.00","2023-11-03"],["6","Alice","Smith","2","2","19","8","Office Chair","250.00","2023-11-04"],["6","Alice","Smith","2","2","20","9","Notebook","3.00","2023-11-05"],["6","Alice","Smith","2","2","21","10","Pen Pack","5.00","2023-11-06"],["6","Alice","Smith","2","2","22","11","Drawing Tablet","400.00","2023-11-07"],["6","Alice","Smith","2","2","23","12","Headphones","150.00","2023-11-08"],["6","Alice","Smith","2","2","24","13","Webcam","80.00","2023-11-09"],["6","Alice","Smith","2","2","25","14","Laptop Stand","50.00","2023-11-10"],["6","Alice","Smith","2","2","26","15","Micro SD Card","20.00","2023-11-11"],["6","Alice","Smith","2","2","27","16","Portable Monitor","180.00","2023-11-12"],["6","Alice","Smith","2","2","28","17","Gaming Mouse","65.00","2023-11-13"],["6","Alice","Smith","2","2","29","18","Mechanical Keyboard","130.00","2023-11-14"],["6","Alice","Smith","2","2","30","19","Smartwatch","210.00","2023-11-15"],["6","Alice","Smith","2","2","31","20","Router","85.00","2023-11-16"],["6","Alice","Smith","2","2","32","1","Cable Organizer","15.00","2023-11-17"],["6","Alice","Smith","2","2","33","2","Flash Drive","12.00","2023-11-18"],["6","Alice","Smith","2","2","34","3","Bluetooth Speaker","90.00","2023-11-19"],["6","Alice","Smith","2","2","35","4","Laptop Bag","70.00","2023-11-20"],["7","Charlie","Brown","3","3","1","1","Laptop","1200.00","2023-06-01"],["7","Charlie","Brown","3","3","1","null","Laptop","1200.00","2023-06-01"],["7","Charlie","Brown","3","3","2","2","Phone","800.00","2023-07-01"],["7","Charlie","Brown","3","3","3","1","Mouse","25.50","2023-07-15"],["7","Charlie","Brown","3","3","4","3","Keyboard","45.00","2023-08-10"],["7","Charlie","Brown","3","3","5","4","Monitor","220.00","2023-08-15"],["7","Charlie","Brown","3","3","6","2","Tablet","600.00","2023-09-01"],["7","Charlie","Brown","3","3","7","3","Webcam","70.00","2023-09-05"],["7","Charlie","Brown","3","3","8","1","Desk Lamp","35.00","2023-09-12"],["7","Charlie","Brown","3","3","9","4","Chair","150.00","2023-10-01"],["7","Charlie","Brown","3","3","10","1","USB Hub","20.00","2023-10-03"],["7","Charlie","Brown","3","3","11","2","External HDD","90.00","2023-10-10"],["7","Charlie","Brown","3","3","12","3","Microphone","130.00","2023-10-15"],["7","Charlie","Brown","3","3","13","4","Graphics Tablet","340.00","2023-10-20"],["7","Charlie","Brown","3","3","14","1","SSD","110.00","2023-10-25"],["7","Charlie","Brown","3","3","15","2","Router","75.00","2023-10-30"],["7","Charlie","Brown","3","3","16","5","Power Supply","95.00","2023-11-01"],["7","Charlie","Brown","3","3","17","6","RAM","60.00","2023-11-02"],["7","Charlie","Brown","3","3","19","8","Office Chair","250.00","2023-11-04"],["7","Charlie","Brown","3","3","20","9","Notebook","3.00","2023-11-05"],["7","Charlie","Brown","3","3","21","10","Pen Pack","5.00","2023-11-06"],["7","Charlie","Brown","3","3","22","11","Drawing Tablet","400.00","2023-11-07"],["7","Charlie","Brown","3","3","23","12","Headphones","150.00","2023-11-08"],["7","Charlie","Brown","3","3","24","13","Webcam","80.00","2023-11-09"],["7","Charlie","Brown","3","3","25","14","Laptop Stand","50.00","2023-11-10"],["7","Charlie","Brown","3","3","26","15","Micro SD Card","20.00","2023-11-11"],["7","Charlie","Brown","3","3","27","16","Portable Monitor","180.00","2023-11-12"],["7","Charlie","Brown","3","3","28","17","Gaming Mouse","65.00","2023-11-13"],["7","Charlie","Brown","3","3","29","18","Mechanical Keyboard","130.00","2023-11-14"],["7","Charlie","Brown","3","3","30","19","Smartwatch","210.00","2023-11-15"],["7","Charlie","Brown","3","3","31","20","Router","85.00","2023-11-16"],["7","Charlie","Brown","3","3","32","1","Cable Organizer","15.00","2023-11-17"],["7","Charlie","Brown","3","3","33","2","Flash Drive","12.00","2023-11-18"],["7","Charlie","Brown","3","3","34","3","Bluetooth Speaker","90.00","2023-11-19"],["7","Charlie","Brown","3","3","35","4","Laptop Bag","70.00","2023-11-20"],["8","Emily","Jones","4","2","1","1","Laptop","1200.00","2023-06-01"],["8","Emily","Jones","4","2","1","null","Laptop","1200.00","2023-06-01"],["8","Emily","Jones","4","2","2","2","Phone","800.00","2023-07-01"],["8","Emily","Jones","4","2","3","1","Mouse","25.50","2023-07-15"],["8","Emily","Jones","4","2","4","3","Keyboard","45.00","2023-08-10"],["8","Emily","Jones","4","2","5","4","Monitor","220.00","2023-08-15"],["8","Emily","Jones","4","2","6","2","Tablet","600.00","2023-09-01"],["8","Emily","Jones","4","2","7","3","Webcam","70.00","2023-09-05"],["8","Emily","Jones","4","2","8","1","Desk Lamp","35.00","2023-09-12"],["8","Emily","Jones","4","2","9","4","Chair","150.00","2023-10-01"],["8","Emily","Jones","4","2","10","1","USB Hub","20.00","2023-10-03"],["8","Emily","Jones","4","2","11","2","External HDD","90.00","2023-10-10"],["8","Emily","Jones","4","2","12","3","Microphone","130.00","2023-10-15"],["8","Emily","Jones","4","2","13","4","Graphics Tablet","340.00","2023-10-20"],["8","Emily","Jones","4","2","14","1","SSD","110.00","2023-10-25"],["8","Emily","Jones","4","2","15","2","Router","75.00","2023-10-30"],["8","Emily","Jones","4","2","16","5","Power Supply","95.00","2023-11-01"],["8","Emily","Jones","4","2","17","6","RAM","60.00","2023-11-02"],["8","Emily","Jones","4","2","18","7","Desk","300.00","2023-11-03"],["8","Emily","Jones","4","2","20","9","Notebook","3.00","2023-11-05"],["8","Emily","Jones","4","2","21","10","Pen Pack","5.00","2023-11-06"],["8","Emily","Jones","4","2","22","11","Drawing Tablet","400.00","2023-11-07"],["8","Emily","Jones","4","2","23","12","Headphones","150.00","2023-11-08"],["8","Emily","Jones","4","2","24","13","Webcam","80.00","2023-11-09"],["8","Emily","Jones","4","2","25","14","Laptop Stand","50.00","2023-11-10"],["8","Emily","Jones","4","2","26","15","Micro SD Card","20.00","2023-11-11"],["8","Emily","Jones","4","2","27","16","Portable Monitor","180.00","2023-11-12"],["8","Emily","Jones","4","2","28","17","Gaming Mouse","65.00","2023-11-13"],["8","Emily","Jones","4","2","29","18","Mechanical Keyboard","130.00","2023-11-14"],["8","Emily","Jones","4","2","30","19","Smartwatch","210.00","2023-11-15"],["8","Emily","Jones","4","2","31","20","Router","85.00","2023-11-16"],["8","Emily","Jones","4","2","32","1","Cable Organizer","15.00","2023-11-17"],["8","Emily","Jones","4","2","33","2","Flash Drive","12.00","2023-11-18"],["8","Emily","Jones","4","2","34","3","Bluetooth Speaker","90.00","2023-11-19"],["8","Emily","Jones","4","2","35","4","Laptop Bag","70.00","2023-11-20"],["9","George","Clark","1","1","1","1","Laptop","1200.00","2023-06-01"],["9","George","Clark","1","1","1","null","Laptop","1200.00","2023-06-01"],["9","George","Clark","1","1","2","2","Phone","800.00","2023-07-01"],["9","George","Clark","1","1","3","1","Mouse","25.50","2023-07-15"],["9","George","Clark","1","1","4","3","Keyboard","45.00","2023-08-10"],["9","George","Clark","1","1","5","4","Monitor","220.00","2023-08-15"],["9","George","Clark","1","1","6","2","Tablet","600.00","2023-09-01"],["9","George","Clark","1","1","7","3","Webcam","70.00","2023-09-05"],["9","George","Clark","1","1","8","1","Desk Lamp","35.00","2023-09-12"],["9","George","Clark","1","1","9","4","Chair","150.00","2023-10-01"],["9","George","Clark","1","1","10","1","USB Hub","20.00","2023-10-03"],["9","George","Clark","1","1","11","2","External HDD","90.00","2023-10-10"],["9","George","Clark","1","1","12","3","Microphone","130.00","2023-10-15"],["9","George","Clark","1","1","13","4","Graphics Tablet","340.00","2023-10-20"],["9","George","Clark","1","1","14","1","SSD","110.00","2023-10-25"],["9","George","Clark","1","1","15","2","Router","75.00","2023-10-30"],["9","George","Clark","1","1","16","5","Power Supply","95.00","2023-11-01"],["9","George","Clark","1","1","17","6","RAM","60.00","2023-11-02"],["9","George","Clark","1","1","18","7","Desk","300.00","2023-11-03"],["9","George","Clark","1","1","19","8","Office Chair","250.00","2023-11-04"],["9","George","Clark","1","1","21","10","Pen Pack","5.00","2023-11-06"],["9","George","Clark","1","1","22","11","Drawing Tablet","400.00","2023-11-07"],["9","George","Clark","1","1","23","12","Headphones","150.00","2023-11-08"],["9","George","Clark","1","1","24","13","Webcam","80.00","2023-11-09"],["9","George","Clark","1","1","25","14","Laptop Stand","50.00","2023-11-10"],["9","George","Clark","1","1","26","15","Micro SD Card","20.00","2023-11-11"],["9","George","Clark","1","1","27","16","Portable Monitor","180.00","2023-11-12"],["9","George","Clark","1","1","28","17","Gaming Mouse","65.00","2023-11-13"],["9","George","Clark","1","1","29","18","Mechanical Keyboard","130.00","2023-11-14"],["9","George","Clark","1","1","30","19","Smartwatch","210.00","2023-11-15"],["9","George","Clark","1","1","31","20","Router","85.00","2023-11-16"],["9","George","Clark","1","1","32","1","Cable Organizer","15.00","2023-11-17"],["9","George","Clark","1","1","33","2","Flash Drive","12.00","2023-11-18"],["9","George","Clark","1","1","34","3","Bluetooth Speaker","90.00","2023-11-19"],["9","George","Clark","1","1","35","4","Laptop Bag","70.00","2023-11-20"],["10","Hannah","Adams","2","2","1","1","Laptop","1200.00","2023-06-01"],["10","Hannah","Adams","2","2","1","null","Laptop","1200.00","2023-06-01"],["10","Hannah","Adams","2","2","2","2","Phone","800.00","2023-07-01"],["10","Hannah","Adams","2","2","3","1","Mouse","25.50","2023-07-15"],["10","Hannah","Adams","2","2","4","3","Keyboard","45.00","2023-08-10"],["10","Hannah","Adams","2","2","5","4","Monitor","220.00","2023-08-15"],["10","Hannah","Adams","2","2","6","2","Tablet","600.00","2023-09-01"],["10","Hannah","Adams","2","2","7","3","Webcam","70.00","2023-09-05"],["10","Hannah","Adams","2","2","8","1","Desk Lamp","35.00","2023-09-12"],["10","Hannah","Adams","2","2","9","4","Chair","150.00","2023-10-01"],["10","Hannah","Adams","2","2","10","1","USB Hub","20.00","2023-10-03"],["10","Hannah","Adams","2","2","11","2","External HDD","90.00","2023-10-10"],["10","Hannah","Adams","2","2","12","3","Microphone","130.00","2023-10-15"],["10","Hannah","Adams","2","2","13","4","Graphics Tablet","340.00","2023-10-20"],["10","Hannah","Adams","2","2","14","1","SSD","110.00","2023-10-25"],["10","Hannah","Adams","2","2","15","2","Router","75.00","2023-10-30"],["10","Hannah","Adams","2","2","16","5","Power Supply","95.00","2023-11-01"],["10","Hannah","Adams","2","2","17","6","RAM","60.00","2023-11-02"],["10","Hannah","Adams","2","2","18","7","Desk","300.00","2023-11-03"],["10","Hannah","Adams","2","2","19","8","Office Chair","250.00","2023-11-04"],["10","Hannah","Adams","2","2","20","9","Notebook","3.00","2023-11-05"],["10","Hannah","Adams","2","2","22","11","Drawing Tablet","400.00","2023-11-07"],["10","Hannah","Adams","2","2","23","12","Headphones","150.00","2023-11-08"],["10","Hannah","Adams","2","2","24","13","Webcam","80.00","2023-11-09"],["10","Hannah","Adams","2","2","25","14","Laptop Stand","50.00","2023-11-10"],["10","Hannah","Adams","2","2","26","15","Micro SD Card","20.00","2023-11-11"],["10","Hannah","Adams","2","2","27","16","Portable Monitor","180.00","2023-11-12"],["10","Hannah","Adams","2","2","28","17","Gaming Mouse","65.00","2023-11-13"],["10","Hannah","Adams","2","2","29","18","Mechanical Keyboard","130.00","2023-11-14"],["10","Hannah","Adams","2","2","30","19","Smartwatch","210.00","2023-11-15"],["10","Hannah","Adams","2","2","31","20","Router","85.00","2023-11-16"],["10","Hannah","Adams","2","2","32","1","Cable Organizer","15.00","2023-11-17"],["10","Hannah","Adams","2","2","33","2","Flash Drive","12.00","2023-11-18"],["10","Hannah","Adams","2","2","34","3","Bluetooth Speaker","90.00","2023-11-19"],["10","Hannah","Adams","2","2","35","4","Laptop Bag","70.00","2023-11-20"],["11","Ivan","Petrov","3","3","1","1","Laptop","1200.00","2023-06-01"],["11","Ivan","Petrov","3","3","1","null","Laptop","1200.00","2023-06-01"],["11","Ivan","Petrov","3","3","2","2","Phone","800.00","2023-07-01"],["11","Ivan","Petrov","3","3","3","1","Mouse","25.50","2023-07-15"],["11","Ivan","Petrov","3","3","4","3","Keyboard","45.00","2023-08-10"],["11","Ivan","Petrov","3","3","5","4","Monitor","220.00","2023-08-15"],["11","Ivan","Petrov","3","3","6","2","Tablet","600.00","2023-09-01"],["11","Ivan","Petrov","3","3","7","3","Webcam","70.00","2023-09-05"],["11","Ivan","Petrov","3","3","8","1","Desk Lamp","35.00","2023-09-12"],["11","Ivan","Petrov","3","3","9","4","Chair","150.00","2023-10-01"],["11","Ivan","Petrov","3","3","10","1","USB Hub","20.00","2023-10-03"],["11","Ivan","Petrov","3","3","11","2","External HDD","90.00","2023-10-10"],["11","Ivan","Petrov","3","3","12","3","Microphone","130.00","2023-10-15"],["11","Ivan","Petrov","3","3","13","4","Graphics Tablet","340.00","2023-10-20"],["11","Ivan","Petrov","3","3","14","1","SSD","110.00","2023-10-25"],["11","Ivan","Petrov","3","3","15","2","Router","75.00","2023-10-30"],["11","Ivan","Petrov","3","3","16","5","Power Supply","95.00","2023-11-01"],["11","Ivan","Petrov","3","3","17","6","RAM","60.00","2023-11-02"],["11","Ivan","Petrov","3","3","18","7","Desk","300.00","2023-11-03"],["11","Ivan","Petrov","3","3","19","8","Office Chair","250.00","2023-11-04"],["11","Ivan","Petrov","3","3","20","9","Notebook","3.00","2023-11-05"],["11","Ivan","Petrov","3","3","21","10","Pen Pack","5.00","2023-11-06"],["11","Ivan","Petrov","3","3","23","12","Headphones","150.00","2023-11-08"],["11","Ivan","Petrov","3","3","24","13","Webcam","80.00","2023-11-09"],["11","Ivan","Petrov","3","3","25","14","Laptop Stand","50.00","2023-11-10"],["11","Ivan","Petrov","3","3","26","15","Micro SD Card","20.00","2023-11-11"],["11","Ivan","Petrov","3","3","27","16","Portable Monitor","180.00","2023-11-12"],["11","Ivan","Petrov","3","3","28","17","Gaming Mouse","65.00","2023-11-13"],["11","Ivan","Petrov","3","3","29","18","Mechanical Keyboard","130.00","2023-11-14"],["11","Ivan","Petrov","3","3","30","19","Smartwatch","210.00","2023-11-15"],["11","Ivan","Petrov","3","3","31","20","Router","85.00","2023-11-16"],["11","Ivan","Petrov","3","3","32","1","Cable Organizer","15.00","2023-11-17"],["11","Ivan","Petrov","3","3","33","2","Flash Drive","12.00","2023-11-18"],["11","Ivan","Petrov","3","3","34","3","Bluetooth Speaker","90.00","2023-11-19"],["11","Ivan","Petrov","3","3","35","4","Laptop Bag","70.00","2023-11-20"],["12","Julia","Williams","4","4","1","1","Laptop","1200.00","2023-06-01"],["12","Julia","Williams","4","4","1","null","Laptop","1200.00","2023-06-01"],["12","Julia","Williams","4","4","2","2","Phone","800.00","2023-07-01"],["12","Julia","Williams","4","4","3","1","Mouse","25.50","2023-07-15"],["12","Julia","Williams","4","4","4","3","Keyboard","45.00","2023-08-10"],["12","Julia","Williams","4","4","5","4","Monitor","220.00","2023-08-15"],["12","Julia","Williams","4","4","6","2","Tablet","600.00","2023-09-01"],["12","Julia","Williams","4","4","7","3","Webcam","70.00","2023-09-05"],["12","Julia","Williams","4","4","8","1","Desk Lamp","35.00","2023-09-12"],["12","Julia","Williams","4","4","9","4","Chair","150.00","2023-10-01"],["12","Julia","Williams","4","4","10","1","USB Hub","20.00","2023-10-03"],["12","Julia","Williams","4","4","11","2","External HDD","90.00","2023-10-10"],["12","Julia","Williams","4","4","12","3","Microphone","130.00","2023-10-15"],["12","Julia","Williams","4","4","13","4","Graphics Tablet","340.00","2023-10-20"],["12","Julia","Williams","4","4","14","1","SSD","110.00","2023-10-25"],["12","Julia","Williams","4","4","15","2","Router","75.00","2023-10-30"],["12","Julia","Williams","4","4","16","5","Power Supply","95.00","2023-11-01"],["12","Julia","Williams","4","4","17","6","RAM","60.00","2023-11-02"],["12","Julia","Williams","4","4","18","7","Desk","300.00","2023-11-03"],["12","Julia","Williams","4","4","19","8","Office Chair","250.00","2023-11-04"],["12","Julia","Williams","4","4","20","9","Notebook","3.00","2023-11-05"],["12","Julia","Williams","4","4","21","10","Pen Pack","5.00","2023-11-06"],["12","Julia","Williams","4","4","22","11","Drawing Tablet","400.00","2023-11-07"],["12","Julia","Williams","4","4","24","13","Webcam","80.00","2023-11-09"],["12","Julia","Williams","4","4","25","14","Laptop Stand","50.00","2023-11-10"],["12","Julia","Williams","4","4","26","15","Micro SD Card","20.00","2023-11-11"],["12","Julia","Williams","4","4","27","16","Portable Monitor","180.00","2023-11-12"],["12","Julia","Williams","4","4","28","17","Gaming Mouse","65.00","2023-11-13"],["12","Julia","Williams","4","4","29","18","Mechanical Keyboard","130.00","2023-11-14"],["12","Julia","Williams","4","4","30","19","Smartwatch","210.00","2023-11-15"],["12","Julia","Williams","4","4","31","20","Router","85.00","2023-11-16"],["12","Julia","Williams","4","4","32","1","Cable Organizer","15.00","2023-11-17"],["12","Julia","Williams","4","4","33","2","Flash Drive","12.00","2023-11-18"],["12","Julia","Williams","4","4","34","3","Bluetooth Speaker","90.00","2023-11-19"],["12","Julia","Williams","4","4","35","4","Laptop Bag","70.00","2023-11-20"],["13","Kevin","Johnson","1","1","1","1","Laptop","1200.00","2023-06-01"],["13","Kevin","Johnson","1","1","1","null","Laptop","1200.00","2023-06-01"],["13","Kevin","Johnson","1","1","2","2","Phone","800.00","2023-07-01"],["13","Kevin","Johnson","1","1","3","1","Mouse","25.50","2023-07-15"],["13","Kevin","Johnson","1","1","4","3","Keyboard","45.00","2023-08-10"],["13","Kevin","Johnson","1","1","5","4","Monitor","220.00","2023-08-15"],["13","Kevin","Johnson","1","1","6","2","Tablet","600.00","2023-09-01"],["13","Kevin","Johnson","1","1","7","3","Webcam","70.00","2023-09-05"],["13","Kevin","Johnson","1","1","8","1","Desk Lamp","35.00","2023-09-12"],["13","Kevin","Johnson","1","1","9","4","Chair","150.00","2023-10-01"],["13","Kevin","Johnson","1","1","10","1","USB Hub","20.00","2023-10-03"],["13","Kevin","Johnson","1","1","11","2","External HDD","90.00","2023-10-10"],["13","Kevin","Johnson","1","1","12","3","Microphone","130.00","2023-10-15"],["13","Kevin","Johnson","1","1","13","4","Graphics Tablet","340.00","2023-10-20"],["13","Kevin","Johnson","1","1","14","1","SSD","110.00","2023-10-25"],["13","Kevin","Johnson","1","1","15","2","Router","75.00","2023-10-30"],["13","Kevin","Johnson","1","1","16","5","Power Supply","95.00","2023-11-01"],["13","Kevin","Johnson","1","1","17","6","RAM","60.00","2023-11-02"],["13","Kevin","Johnson","1","1","18","7","Desk","300.00","2023-11-03"],["13","Kevin","Johnson","1","1","19","8","Office Chair","250.00","2023-11-04"],["13","Kevin","Johnson","1","1","20","9","Notebook","3.00","2023-11-05"],["13","Kevin","Johnson","1","1","21","10","Pen Pack","5.00","2023-11-06"],["13","Kevin","Johnson","1","1","22","11","Drawing Tablet","400.00","2023-11-07"],["13","Kevin","Johnson","1","1","23","12","Headphones","150.00","2023-11-08"],["13","Kevin","Johnson","1","1","25","14","Laptop Stand","50.00","2023-11-10"],["13","Kevin","Johnson","1","1","26","15","Micro SD Card","20.00","2023-11-11"],["13","Kevin","Johnson","1","1","27","16","Portable Monitor","180.00","2023-11-12"],["13","Kevin","Johnson","1","1","28","17","Gaming Mouse","65.00","2023-11-13"],["13","Kevin","Johnson","1","1","29","18","Mechanical Keyboard","130.00","2023-11-14"],["13","Kevin","Johnson","1","1","30","19","Smartwatch","210.00","2023-11-15"],["13","Kevin","Johnson","1","1","31","20","Router","85.00","2023-11-16"],["13","Kevin","Johnson","1","1","32","1","Cable Organizer","15.00","2023-11-17"],["13","Kevin","Johnson","1","1","33","2","Flash Drive","12.00","2023-11-18"],["13","Kevin","Johnson","1","1","34","3","Bluetooth Speaker","90.00","2023-11-19"],["13","Kevin","Johnson","1","1","35","4","Laptop Bag","70.00","2023-11-20"],["14","Laura","Martinez","2","2","1","1","Laptop","1200.00","2023-06-01"],["14","Laura","Martinez","2","2","1","null","Laptop","1200.00","2023-06-01"],["14","Laura","Martinez","2","2","2","2","Phone","800.00","2023-07-01"],["14","Laura","Martinez","2","2","3","1","Mouse","25.50","2023-07-15"],["14","Laura","Martinez","2","2","4","3","Keyboard","45.00","2023-08-10"],["14","Laura","Martinez","2","2","5","4","Monitor","220.00","2023-08-15"],["14","Laura","Martinez","2","2","6","2","Tablet","600.00","2023-09-01"],["14","Laura","Martinez","2","2","7","3","Webcam","70.00","2023-09-05"],["14","Laura","Martinez","2","2","8","1","Desk Lamp","35.00","2023-09-12"],["14","Laura","Martinez","2","2","9","4","Chair","150.00","2023-10-01"],["14","Laura","Martinez","2","2","10","1","USB Hub","20.00","2023-10-03"],["14","Laura","Martinez","2","2","11","2","External HDD","90.00","2023-10-10"],["14","Laura","Martinez","2","2","12","3","Microphone","130.00","2023-10-15"],["14","Laura","Martinez","2","2","13","4","Graphics Tablet","340.00","2023-10-20"],["14","Laura","Martinez","2","2","14","1","SSD","110.00","2023-10-25"],["14","Laura","Martinez","2","2","15","2","Router","75.00","2023-10-30"],["14","Laura","Martinez","2","2","16","5","Power Supply","95.00","2023-11-01"],["14","Laura","Martinez","2","2","17","6","RAM","60.00","2023-11-02"],["14","Laura","Martinez","2","2","18","7","Desk","300.00","2023-11-03"],["14","Laura","Martinez","2","2","19","8","Office Chair","250.00","2023-11-04"],["14","Laura","Martinez","2","2","20","9","Notebook","3.00","2023-11-05"],["14","Laura","Martinez","2","2","21","10","Pen Pack","5.00","2023-11-06"],["14","Laura","Martinez","2","2","22","11","Drawing Tablet","400.00","2023-11-07"],["14","Laura","Martinez","2","2","23","12","Headphones","150.00","2023-11-08"],["14","Laura","Martinez","2","2","24","13","Webcam","80.00","2023-11-09"],["14","Laura","Martinez","2","2","26","15","Micro SD Card","20.00","2023-11-11"],["14","Laura","Martinez","2","2","27","16","Portable Monitor","180.00","2023-11-12"],["14","Laura","Martinez","2","2","28","17","Gaming Mouse","65.00","2023-11-13"],["14","Laura","Martinez","2","2","29","18","Mechanical Keyboard","130.00","2023-11-14"],["14","Laura","Martinez","2","2","30","19","Smartwatch","210.00","2023-11-15"],["14","Laura","Martinez","2","2","31","20","Router","85.00","2023-11-16"],["14","Laura","Martinez","2","2","32","1","Cable Organizer","15.00","2023-11-17"],["14","Laura","Martinez","2","2","33","2","Flash Drive","12.00","2023-11-18"],["14","Laura","Martinez","2","2","34","3","Bluetooth Speaker","90.00","2023-11-19"],["14","Laura","Martinez","2","2","35","4","Laptop Bag","70.00","2023-11-20"],["15","Michael","Lee","3","3","1","1","Laptop","1200.00","2023-06-01"],["15","Michael","Lee","3","3","1","null","Laptop","1200.00","2023-06-01"],["15","Michael","Lee","3","3","2","2","Phone","800.00","2023-07-01"],["15","Michael","Lee","3","3","3","1","Mouse","25.50","2023-07-15"],["15","Michael","Lee","3","3","4","3","Keyboard","45.00","2023-08-10"],["15","Michael","Lee","3","3","5","4","Monitor","220.00","2023-08-15"],["15","Michael","Lee","3","3","6","2","Tablet","600.00","2023-09-01"],["15","Michael","Lee","3","3","7","3","Webcam","70.00","2023-09-05"],["15","Michael","Lee","3","3","8","1","Desk Lamp","35.00","2023-09-12"],["15","Michael","Lee","3","3","9","4","Chair","150.00","2023-10-01"],["15","Michael","Lee","3","3","10","1","USB Hub","20.00","2023-10-03"],["15","Michael","Lee","3","3","11","2","External HDD","90.00","2023-10-10"],["15","Michael","Lee","3","3","12","3","Microphone","130.00","2023-10-15"],["15","Michael","Lee","3","3","13","4","Graphics Tablet","340.00","2023-10-20"],["15","Michael","Lee","3","3","14","1","SSD","110.00","2023-10-25"],["15","Michael","Lee","3","3","15","2","Router","75.00","2023-10-30"],["15","Michael","Lee","3","3","16","5","Power Supply","95.00","2023-11-01"],["15","Michael","Lee","3","3","17","6","RAM","60.00","2023-11-02"],["15","Michael","Lee","3","3","18","7","Desk","300.00","2023-11-03"],["15","Michael","Lee","3","3","19","8","Office Chair","250.00","2023-11-04"],["15","Michael","Lee","3","3","20","9","Notebook","3.00","2023-11-05"],["15","Michael","Lee","3","3","21","10","Pen Pack","5.00","2023-11-06"],["15","Michael","Lee","3","3","22","11","Drawing Tablet","400.00","2023-11-07"],["15","Michael","Lee","3","3","23","12","Headphones","150.00","2023-11-08"],["15","Michael","Lee","3","3","24","13","Webcam","80.00","2023-11-09"],["15","Michael","Lee","3","3","25","14","Laptop Stand","50.00","2023-11-10"],["15","Michael","Lee","3","3","27","16","Portable Monitor","180.00","2023-11-12"],["15","Michael","Lee","3","3","28","17","Gaming Mouse","65.00","2023-11-13"],["15","Michael","Lee","3","3","29","18","Mechanical Keyboard","130.00","2023-11-14"],["15","Michael","Lee","3","3","30","19","Smartwatch","210.00","2023-11-15"],["15","Michael","Lee","3","3","31","20","Router","85.00","2023-11-16"],["15","Michael","Lee","3","3","32","1","Cable Organizer","15.00","2023-11-17"],["15","Michael","Lee","3","3","33","2","Flash Drive","12.00","2023-11-18"],["15","Michael","Lee","3","3","34","3","Bluetooth Speaker","90.00","2023-11-19"],["15","Michael","Lee","3","3","35","4","Laptop Bag","70.00","2023-11-20"],["16","Nina","White","4","4","1","1","Laptop","1200.00","2023-06-01"],["16","Nina","White","4","4","1","null","Laptop","1200.00","2023-06-01"],["16","Nina","White","4","4","2","2","Phone","800.00","2023-07-01"],["16","Nina","White","4","4","3","1","Mouse","25.50","2023-07-15"],["16","Nina","White","4","4","4","3","Keyboard","45.00","2023-08-10"],["16","Nina","White","4","4","5","4","Monitor","220.00","2023-08-15"],["16","Nina","White","4","4","6","2","Tablet","600.00","2023-09-01"],["16","Nina","White","4","4","7","3","Webcam","70.00","2023-09-05"],["16","Nina","White","4","4","8","1","Desk Lamp","35.00","2023-09-12"],["16","Nina","White","4","4","9","4","Chair","150.00","2023-10-01"],["16","Nina","White","4","4","10","1","USB Hub","20.00","2023-10-03"],["16","Nina","White","4","4","11","2","External HDD","90.00","2023-10-10"],["16","Nina","White","4","4","12","3","Microphone","130.00","2023-10-15"],["16","Nina","White","4","4","13","4","Graphics Tablet","340.00","2023-10-20"],["16","Nina","White","4","4","14","1","SSD","110.00","2023-10-25"],["16","Nina","White","4","4","15","2","Router","75.00","2023-10-30"],["16","Nina","White","4","4","16","5","Power Supply","95.00","2023-11-01"],["16","Nina","White","4","4","17","6","RAM","60.00","2023-11-02"],["16","Nina","White","4","4","18","7","Desk","300.00","2023-11-03"],["16","Nina","White","4","4","19","8","Office Chair","250.00","2023-11-04"],["16","Nina","White","4","4","20","9","Notebook","3.00","2023-11-05"],["16","Nina","White","4","4","21","10","Pen Pack","5.00","2023-11-06"],["16","Nina","White","4","4","22","11","Drawing Tablet","400.00","2023-11-07"],["16","Nina","White","4","4","23","12","Headphones","150.00","2023-11-08"],["16","Nina","White","4","4","24","13","Webcam","80.00","2023-11-09"],["16","Nina","White","4","4","25","14","Laptop Stand","50.00","2023-11-10"],["16","Nina","White","4","4","26","15","Micro SD Card","20.00","2023-11-11"],["16","Nina","White","4","4","28","17","Gaming Mouse","65.00","2023-11-13"],["16","Nina","White","4","4","29","18","Mechanical Keyboard","130.00","2023-11-14"],["16","Nina","White","4","4","30","19","Smartwatch","210.00","2023-11-15"],["16","Nina","White","4","4","31","20","Router","85.00","2023-11-16"],["16","Nina","White","4","4","32","1","Cable Organizer","15.00","2023-11-17"],["16","Nina","White","4","4","33","2","Flash Drive","12.00","2023-11-18"],["16","Nina","White","4","4","34","3","Bluetooth Speaker","90.00","2023-11-19"],["16","Nina","White","4","4","35","4","Laptop Bag","70.00","2023-11-20"],["17","Oscar","Hall","1","1","1","1","Laptop","1200.00","2023-06-01"],["17","Oscar","Hall","1","1","1","null","Laptop","1200.00","2023-06-01"],["17","Oscar","Hall","1","1","2","2","Phone","800.00","2023-07-01"],["17","Oscar","Hall","1","1","3","1","Mouse","25.50","2023-07-15"],["17","Oscar","Hall","1","1","4","3","Keyboard","45.00","2023-08-10"],["17","Oscar","Hall","1","1","5","4","Monitor","220.00","2023-08-15"],["17","Oscar","Hall","1","1","6","2","Tablet","600.00","2023-09-01"],["17","Oscar","Hall","1","1","7","3","Webcam","70.00","2023-09-05"],["17","Oscar","Hall","1","1","8","1","Desk Lamp","35.00","2023-09-12"],["17","Oscar","Hall","1","1","9","4","Chair","150.00","2023-10-01"],["17","Oscar","Hall","1","1","10","1","USB Hub","20.00","2023-10-03"],["17","Oscar","Hall","1","1","11","2","External HDD","90.00","2023-10-10"],["17","Oscar","Hall","1","1","12","3","Microphone","130.00","2023-10-15"],["17","Oscar","Hall","1","1","13","4","Graphics Tablet","340.00","2023-10-20"],["17","Oscar","Hall","1","1","14","1","SSD","110.00","2023-10-25"],["17","Oscar","Hall","1","1","15","2","Router","75.00","2023-10-30"],["17","Oscar","Hall","1","1","16","5","Power Supply","95.00","2023-11-01"],["17","Oscar","Hall","1","1","17","6","RAM","60.00","2023-11-02"],["17","Oscar","Hall","1","1","18","7","Desk","300.00","2023-11-03"],["17","Oscar","Hall","1","1","19","8","Office Chair","250.00","2023-11-04"],["17","Oscar","Hall","1","1","20","9","Notebook","3.00","2023-11-05"],["17","Oscar","Hall","1","1","21","10","Pen Pack","5.00","2023-11-06"],["17","Oscar","Hall","1","1","22","11","Drawing Tablet","400.00","2023-11-07"],["17","Oscar","Hall","1","1","23","12","Headphones","150.00","2023-11-08"],["17","Oscar","Hall","1","1","24","13","Webcam","80.00","2023-11-09"],["17","Oscar","Hall","1","1","25","14","Laptop Stand","50.00","2023-11-10"],["17","Oscar","Hall","1","1","26","15","Micro SD Card","20.00","2023-11-11"],["17","Oscar","Hall","1","1","27","16","Portable Monitor","180.00","2023-11-12"],["17","Oscar","Hall","1","1","29","18","Mechanical Keyboard","130.00","2023-11-14"],["17","Oscar","Hall","1","1","30","19","Smartwatch","210.00","2023-11-15"],["17","Oscar","Hall","1","1","31","20","Router","85.00","2023-11-16"],["17","Oscar","Hall","1","1","32","1","Cable Organizer","15.00","2023-11-17"],["17","Oscar","Hall","1","1","33","2","Flash Drive","12.00","2023-11-18"],["17","Oscar","Hall","1","1","34","3","Bluetooth Speaker","90.00","2023-11-19"],["17","Oscar","Hall","1","1","35","4","Laptop Bag","70.00","2023-11-20"],["18","Paul","Allen","2","2","1","1","Laptop","1200.00","2023-06-01"],["18","Paul","Allen","2","2","1","null","Laptop","1200.00","2023-06-01"],["18","Paul","Allen","2","2","2","2","Phone","800.00","2023-07-01"],["18","Paul","Allen","2","2","3","1","Mouse","25.50","2023-07-15"],["18","Paul","Allen","2","2","4","3","Keyboard","45.00","2023-08-10"],["18","Paul","Allen","2","2","5","4","Monitor","220.00","2023-08-15"],["18","Paul","Allen","2","2","6","2","Tablet","600.00","2023-09-01"],["18","Paul","Allen","2","2","7","3","Webcam","70.00","2023-09-05"],["18","Paul","Allen","2","2","8","1","Desk Lamp","35.00","2023-09-12"],["18","Paul","Allen","2","2","9","4","Chair","150.00","2023-10-01"],["18","Paul","Allen","2","2","10","1","USB Hub","20.00","2023-10-03"],["18","Paul","Allen","2","2","11","2","External HDD","90.00","2023-10-10"],["18","Paul","Allen","2","2","12","3","Microphone","130.00","2023-10-15"],["18","Paul","Allen","2","2","13","4","Graphics Tablet","340.00","2023-10-20"],["18","Paul","Allen","2","2","14","1","SSD","110.00","2023-10-25"],["18","Paul","Allen","2","2","15","2","Router","75.00","2023-10-30"],["18","Paul","Allen","2","2","16","5","Power Supply","95.00","2023-11-01"],["18","Paul","Allen","2","2","17","6","RAM","60.00","2023-11-02"],["18","Paul","Allen","2","2","18","7","Desk","300.00","2023-11-03"],["18","Paul","Allen","2","2","19","8","Office Chair","250.00","2023-11-04"],["18","Paul","Allen","2","2","20","9","Notebook","3.00","2023-11-05"],["18","Paul","Allen","2","2","21","10","Pen Pack","5.00","2023-11-06"],["18","Paul","Allen","2","2","22","11","Drawing Tablet","400.00","2023-11-07"],["18","Paul","Allen","2","2","23","12","Headphones","150.00","2023-11-08"],["18","Paul","Allen","2","2","24","13","Webcam","80.00","2023-11-09"],["18","Paul","Allen","2","2","25","14","Laptop Stand","50.00","2023-11-10"],["18","Paul","Allen","2","2","26","15","Micro SD Card","20.00","2023-11-11"],["18","Paul","Allen","2","2","27","16","Portable Monitor","180.00","2023-11-12"],["18","Paul","Allen","2","2","28","17","Gaming Mouse","65.00","2023-11-13"],["18","Paul","Allen","2","2","30","19","Smartwatch","210.00","2023-11-15"],["18","Paul","Allen","2","2","31","20","Router","85.00","2023-11-16"],["18","Paul","Allen","2","2","32","1","Cable Organizer","15.00","2023-11-17"],["18","Paul","Allen","2","2","33","2","Flash Drive","12.00","2023-11-18"],["18","Paul","Allen","2","2","34","3","Bluetooth Speaker","90.00","2023-11-19"],["18","Paul","Allen","2","2","35","4","Laptop Bag","70.00","2023-11-20"],["19","Queen","Moore","3","3","1","1","Laptop","1200.00","2023-06-01"],["19","Queen","Moore","3","3","1","null","Laptop","1200.00","2023-06-01"],["19","Queen","Moore","3","3","2","2","Phone","800.00","2023-07-01"],["19","Queen","Moore","3","3","3","1","Mouse","25.50","2023-07-15"],["19","Queen","Moore","3","3","4","3","Keyboard","45.00","2023-08-10"],["19","Queen","Moore","3","3","5","4","Monitor","220.00","2023-08-15"],["19","Queen","Moore","3","3","6","2","Tablet","600.00","2023-09-01"],["19","Queen","Moore","3","3","7","3","Webcam","70.00","2023-09-05"],["19","Queen","Moore","3","3","8","1","Desk Lamp","35.00","2023-09-12"],["19","Queen","Moore","3","3","9","4","Chair","150.00","2023-10-01"],["19","Queen","Moore","3","3","10","1","USB Hub","20.00","2023-10-03"],["19","Queen","Moore","3","3","11","2","External HDD","90.00","2023-10-10"],["19","Queen","Moore","3","3","12","3","Microphone","130.00","2023-10-15"],["19","Queen","Moore","3","3","13","4","Graphics Tablet","340.00","2023-10-20"],["19","Queen","Moore","3","3","14","1","SSD","110.00","2023-10-25"],["19","Queen","Moore","3","3","15","2","Router","75.00","2023-10-30"],["19","Queen","Moore","3","3","16","5","Power Supply","95.00","2023-11-01"],["19","Queen","Moore","3","3","17","6","RAM","60.00","2023-11-02"],["19","Queen","Moore","3","3","18","7","Desk","300.00","2023-11-03"],["19","Queen","Moore","3","3","19","8","Office Chair","250.00","2023-11-04"],["19","Queen","Moore","3","3","20","9","Notebook","3.00","2023-11-05"],["19","Queen","Moore","3","3","21","10","Pen Pack","5.00","2023-11-06"],["19","Queen","Moore","3","3","22","11","Drawing Tablet","400.00","2023-11-07"],["19","Queen","Moore","3","3","23","12","Headphones","150.00","2023-11-08"],["19","Queen","Moore","3","3","24","13","Webcam","80.00","2023-11-09"],["19","Queen","Moore","3","3","25","14","Laptop Stand","50.00","2023-11-10"],["19","Queen","Moore","3","3","26","15","Micro SD Card","20.00","2023-11-11"],["19","Queen","Moore","3","3","27","16","Portable Monitor","180.00","2023-11-12"],["19","Queen","Moore","3","3","28","17","Gaming Mouse","65.00","2023-11-13"],["19","Queen","Moore","3","3","29","18","Mechanical Keyboard","130.00","2023-11-14"],["19","Queen","Moore","3","3","31","20","Router","85.00","2023-11-16"],["19","Queen","Moore","3","3","32","1","Cable Organizer","15.00","2023-11-17"],["19","Queen","Moore","3","3","33","2","Flash Drive","12.00","2023-11-18"],["19","Queen","Moore","3","3","34","3","Bluetooth Speaker","90.00","2023-11-19"],["19","Queen","Moore","3","3","35","4","Laptop Bag","70.00","2023-11-20"],["20","Rachel","Taylor","4","4","1","1","Laptop","1200.00","2023-06-01"],["20","Rachel","Taylor","4","4","1","null","Laptop","1200.00","2023-06-01"],["20","Rachel","Taylor","4","4","2","2","Phone","800.00","2023-07-01"],["20","Rachel","Taylor","4","4","3","1","Mouse","25.50","2023-07-15"],["20","Rachel","Taylor","4","4","4","3","Keyboard","45.00","2023-08-10"],["20","Rachel","Taylor","4","4","5","4","Monitor","220.00","2023-08-15"],["20","Rachel","Taylor","4","4","6","2","Tablet","600.00","2023-09-01"],["20","Rachel","Taylor","4","4","7","3","Webcam","70.00","2023-09-05"],["20","Rachel","Taylor","4","4","8","1","Desk Lamp","35.00","2023-09-12"],["20","Rachel","Taylor","4","4","9","4","Chair","150.00","2023-10-01"],["20","Rachel","Taylor","4","4","10","1","USB Hub","20.00","2023-10-03"],["20","Rachel","Taylor","4","4","11","2","External HDD","90.00","2023-10-10"],["20","Rachel","Taylor","4","4","12","3","Microphone","130.00","2023-10-15"],["20","Rachel","Taylor","4","4","13","4","Graphics Tablet","340.00","2023-10-20"],["20","Rachel","Taylor","4","4","14","1","SSD","110.00","2023-10-25"],["20","Rachel","Taylor","4","4","15","2","Router","75.00","2023-10-30"],["20","Rachel","Taylor","4","4","16","5","Power Supply","95.00","2023-11-01"],["20","Rachel","Taylor","4","4","17","6","RAM","60.00","2023-11-02"],["20","Rachel","Taylor","4","4","18","7","Desk","300.00","2023-11-03"],["20","Rachel","Taylor","4","4","19","8","Office Chair","250.00","2023-11-04"],["20","Rachel","Taylor","4","4","20","9","Notebook","3.00","2023-11-05"],["20","Rachel","Taylor","4","4","21","10","Pen Pack","5.00","2023-11-06"],["20","Rachel","Taylor","4","4","22","11","Drawing Tablet","400.00","2023-11-07"],["20","Rachel","Taylor","4","4","23","12","Headphones","150.00","2023-11-08"],["20","Rachel","Taylor","4","4","24","13","Webcam","80.00","2023-11-09"],["20","Rachel","Taylor","4","4","25","14","Laptop Stand","50.00","2023-11-10"],["20","Rachel","Taylor","4","4","26","15","Micro SD Card","20.00","2023-11-11"],["20","Rachel","Taylor","4","4","27","16","Portable Monitor","180.00","2023-11-12"],["20","Rachel","Taylor","4","4","28","17","Gaming Mouse","65.00","2023-11-13"],["20","Rachel","Taylor","4","4","29","18","Mechanical Keyboard","130.00","2023-11-14"],["20","Rachel","Taylor","4","4","30","19","Smartwatch","210.00","2023-11-15"],["20","Rachel","Taylor","4","4","32","1","Cable Organizer","15.00","2023-11-17"],["20","Rachel","Taylor","4","4","33","2","Flash Drive","12.00","2023-11-18"],["20","Rachel","Taylor","4","4","34","3","Bluetooth Speaker","90.00","2023-11-19"],["20","Rachel","Taylor","4","4","35","4","Laptop Bag","70.00","2023-11-20"]],"tableName":"people-commande-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("LIMIT TEST -- 28", () => {
    //ARRANGE
    const query = 'select * from people LIMIT 3';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"],["2","Jane","Doe","2","null"],["3","Bob","Dylan","3","null"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("LIMIT TEST WITH WHERE CLAUSE -- 29", () => {
    //ARRANGE
    const query = 'select * from people where id <= 10 and id > 5 LIMIT 4';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["6","Alice","Smith","2","2"],["7","Charlie","Brown","3","3"],["8","Emily","Jones","4","2"],["9","George","Clark","1","1"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("ORDER BY NO EXTRA KEYWORD -- 30", () => {
    //ARRANGE
    const query = 'select * from people order by id';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["1","John","Doe","1","2"],["2","Jane","Doe","2","null"],["3","Bob","Dylan","3","null"],["4","Cillian","Murphy","4","null"],["5","Jobless","Murphy","1","null"],["6","Alice","Smith","2","2"],["7","Charlie","Brown","3","3"],["8","Emily","Jones","4","2"],["9","George","Clark","1","1"],["10","Hannah","Adams","2","2"],["11","Ivan","Petrov","3","3"],["12","Julia","Williams","4","4"],["13","Kevin","Johnson","1","1"],["14","Laura","Martinez","2","2"],["15","Michael","Lee","3","3"],["16","Nina","White","4","4"],["17","Oscar","Hall","1","1"],["18","Paul","Allen","2","2"],["19","Queen","Moore","3","3"],["20","Rachel","Taylor","4","4"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("ORDER BY EXTRA KEYWORD DESC -- 31", () => {
    //ARRANGE
    const query = 'select * from people where id <= 15 ORDER BY idManager DESC LIMIT 15';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["12","Julia","Williams","4","4"],["7","Charlie","Brown","3","3"],["11","Ivan","Petrov","3","3"],["15","Michael","Lee","3","3"],["1","John","Doe","1","2"],["6","Alice","Smith","2","2"],["8","Emily","Jones","4","2"],["10","Hannah","Adams","2","2"],["14","Laura","Martinez","2","2"],["9","George","Clark","1","1"],["13","Kevin","Johnson","1","1"],["2","Jane","Doe","2","null"],["3","Bob","Dylan","3","null"],["4","Cillian","Murphy","4","null"],["5","Jobless","Murphy","1","null"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("ORDER BY EXTRA KEYWORD ASC -- 32", () => {
    //ARRANGE
    const query = 'select * from people where id <= 15 ORDER BY idManager ASC LIMIT 15';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["9","George","Clark","1","1"],["13","Kevin","Johnson","1","1"],["1","John","Doe","1","2"],["6","Alice","Smith","2","2"],["8","Emily","Jones","4","2"],["10","Hannah","Adams","2","2"],["14","Laura","Martinez","2","2"],["7","Charlie","Brown","3","3"],["11","Ivan","Petrov","3","3"],["15","Michael","Lee","3","3"],["12","Julia","Williams","4","4"],["2","Jane","Doe","2","null"],["3","Bob","Dylan","3","null"],["4","Cillian","Murphy","4","null"],["5","Jobless","Murphy","1","null"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("COMPLEX QUERY -- 33", () => {
    //ARRANGE
    const query = 'select * from people left join job on people.jobId = job.id left join salary on job.idSalary = salary.id where people.id > 10 order by salary limit 5';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager","id","occupation","idSalary","id","salary"],["12","Julia","Williams","4","4","4","Barman","1","1","10000"],["13","Kevin","Johnson","1","1","1","Mason","1","1","10000"],["16","Nina","White","4","4","4","Barman","1","1","10000"],["17","Oscar","Hall","1","1","1","Mason","1","1","10000"],["20","Rachel","Taylor","4","4","4","Barman","1","1","10000"]],"tableName":"people-job-salary-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("FULL OUTER JOIN -- 34", () => {
    //ARRANGE
    const query = 'select * from people full outer join job on people.jobId = job.id';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager","id","occupation","idSalary"],["1","John","Doe","1","2","1","Mason","1"],["2","Jane","Doe","2","null","2","Plumber","2"],["3","Bob","Dylan","3","null","3","Bouncer","3"],["4","Cillian","Murphy","4","null","4","Barman","1"],["5","Jobless","Murphy","1","null","1","Mason","1"],["6","Alice","Smith","2","2","2","Plumber","2"],["7","Charlie","Brown","3","3","3","Bouncer","3"],["8","Emily","Jones","4","2","4","Barman","1"],["9","George","Clark","1","1","1","Mason","1"],["10","Hannah","Adams","2","2","2","Plumber","2"],["11","Ivan","Petrov","3","3","3","Bouncer","3"],["12","Julia","Williams","4","4","4","Barman","1"],["13","Kevin","Johnson","1","1","1","Mason","1"],["14","Laura","Martinez","2","2","2","Plumber","2"],["15","Michael","Lee","3","3","3","Bouncer","3"],["16","Nina","White","4","4","4","Barman","1"],["17","Oscar","Hall","1","1","1","Mason","1"],["18","Paul","Allen","2","2","2","Plumber","2"],["19","Queen","Moore","3","3","3","Bouncer","3"],["20","Rachel","Taylor","4","4","4","Barman","1"],["null","null","null","null","null","5","Electrician","2"],["null","null","null","null","null","6","Carpenter","3"],["null","null","null","null","null","7","Technician","2"],["null","null","null","null","null","8","Engineer","3"],["null","null","null","null","null","9","Mechanic","2"],["null","null","null","null","null","10","Painter","1"]],"tableName":"people-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("FULL OUTER JOIN -- 35", () => {
    //ARRANGE
    const query = 'select * from job full outer join people on job.id = people.jobId';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","occupation","idSalary","id","firstName","lastName","jobId","idManager"],["1","Mason","1","1","John","Doe","1","2"],["1","Mason","1","5","Jobless","Murphy","1","null"],["1","Mason","1","9","George","Clark","1","1"],["1","Mason","1","13","Kevin","Johnson","1","1"],["1","Mason","1","17","Oscar","Hall","1","1"],["2","Plumber","2","2","Jane","Doe","2","null"],["2","Plumber","2","6","Alice","Smith","2","2"],["2","Plumber","2","10","Hannah","Adams","2","2"],["2","Plumber","2","14","Laura","Martinez","2","2"],["2","Plumber","2","18","Paul","Allen","2","2"],["3","Bouncer","3","3","Bob","Dylan","3","null"],["3","Bouncer","3","7","Charlie","Brown","3","3"],["3","Bouncer","3","11","Ivan","Petrov","3","3"],["3","Bouncer","3","15","Michael","Lee","3","3"],["3","Bouncer","3","19","Queen","Moore","3","3"],["4","Barman","1","4","Cillian","Murphy","4","null"],["4","Barman","1","8","Emily","Jones","4","2"],["4","Barman","1","12","Julia","Williams","4","4"],["4","Barman","1","16","Nina","White","4","4"],["4","Barman","1","20","Rachel","Taylor","4","4"],["5","Electrician","2","null","null","null","null","null"],["6","Carpenter","3","null","null","null","null","null"],["7","Technician","2","null","null","null","null","null"],["8","Engineer","3","null","null","null","null","null"],["9","Mechanic","2","null","null","null","null","null"],["10","Painter","1","null","null","null","null","null"]],"tableName":"job-people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("WHERE CLAUSE WITH ORDER BY -- 36", () => {
    //ARRANGE
    const query = 'select * from people where id <= 10 and id > 5 order by id';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["6","Alice","Smith","2","2"],["7","Charlie","Brown","3","3"],["8","Emily","Jones","4","2"],["9","George","Clark","1","1"],["10","Hannah","Adams","2","2"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("WHERE CLAUSE WITH ORDER BY AND LIMIT -- 37", () => {
    //ARRANGE
    const query = 'select * from people where id <= 15 ORDER BY idManager LIMIT 15';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager"],["9","George","Clark","1","1"],["13","Kevin","Johnson","1","1"],["1","John","Doe","1","2"],["6","Alice","Smith","2","2"],["8","Emily","Jones","4","2"],["10","Hannah","Adams","2","2"],["14","Laura","Martinez","2","2"],["7","Charlie","Brown","3","3"],["11","Ivan","Petrov","3","3"],["15","Michael","Lee","3","3"],["12","Julia","Williams","4","4"],["2","Jane","Doe","2","null"],["3","Bob","Dylan","3","null"],["4","Cillian","Murphy","4","null"],["5","Jobless","Murphy","1","null"]],"tableName":"people-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("ORDER BY WITH A STRING -- 38", () => {
    //ARRANGE
    const query = 'select * from people full outer join job on people.jobId = job.id order by firstName ASC';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","firstName","lastName","jobId","idManager","id","occupation","idSalary"],["6","Alice","Smith","2","2","2","Plumber","2"],["3","Bob","Dylan","3","null","3","Bouncer","3"],["7","Charlie","Brown","3","3","3","Bouncer","3"],["4","Cillian","Murphy","4","null","4","Barman","1"],["8","Emily","Jones","4","2","4","Barman","1"],["9","George","Clark","1","1","1","Mason","1"],["10","Hannah","Adams","2","2","2","Plumber","2"],["11","Ivan","Petrov","3","3","3","Bouncer","3"],["2","Jane","Doe","2","null","2","Plumber","2"],["5","Jobless","Murphy","1","null","1","Mason","1"],["1","John","Doe","1","2","1","Mason","1"],["12","Julia","Williams","4","4","4","Barman","1"],["13","Kevin","Johnson","1","1","1","Mason","1"],["14","Laura","Martinez","2","2","2","Plumber","2"],["15","Michael","Lee","3","3","3","Bouncer","3"],["16","Nina","White","4","4","4","Barman","1"],["17","Oscar","Hall","1","1","1","Mason","1"],["18","Paul","Allen","2","2","2","Plumber","2"],["19","Queen","Moore","3","3","3","Bouncer","3"],["20","Rachel","Taylor","4","4","4","Barman","1"],["null","null","null","null","null","5","Electrician","2"],["null","null","null","null","null","6","Carpenter","3"],["null","null","null","null","null","7","Technician","2"],["null","null","null","null","null","8","Engineer","3"],["null","null","null","null","null","9","Mechanic","2"],["null","null","null","null","null","10","Painter","1"]],"tableName":"people-job-filtered"}')
  }) 
})

 describe(SqlParser.name, () => {
  it("ORDER BY WITH A DATE -- 38", () => {
    //ARRANGE
    const query = 'select * from commande order by createdAt DESC';
    const tablesObj = structuredClone(testingData);

    //ACT
    const result = JSON.stringify(SqlParser(query, tablesObj));

    //ASSERT
    expect(result).toBe('{"table":[["id","userId","product","amount","createdAt"],["35","4","Laptop Bag","70.00","2023-11-20"],["34","3","Bluetooth Speaker","90.00","2023-11-19"],["33","2","Flash Drive","12.00","2023-11-18"],["32","1","Cable Organizer","15.00","2023-11-17"],["31","20","Router","85.00","2023-11-16"],["30","19","Smartwatch","210.00","2023-11-15"],["29","18","Mechanical Keyboard","130.00","2023-11-14"],["28","17","Gaming Mouse","65.00","2023-11-13"],["27","16","Portable Monitor","180.00","2023-11-12"],["26","15","Micro SD Card","20.00","2023-11-11"],["25","14","Laptop Stand","50.00","2023-11-10"],["24","13","Webcam","80.00","2023-11-09"],["23","12","Headphones","150.00","2023-11-08"],["22","11","Drawing Tablet","400.00","2023-11-07"],["21","10","Pen Pack","5.00","2023-11-06"],["20","9","Notebook","3.00","2023-11-05"],["19","8","Office Chair","250.00","2023-11-04"],["18","7","Desk","300.00","2023-11-03"],["17","6","RAM","60.00","2023-11-02"],["16","5","Power Supply","95.00","2023-11-01"],["15","2","Router","75.00","2023-10-30"],["14","1","SSD","110.00","2023-10-25"],["13","4","Graphics Tablet","340.00","2023-10-20"],["12","3","Microphone","130.00","2023-10-15"],["11","2","External HDD","90.00","2023-10-10"],["10","1","USB Hub","20.00","2023-10-03"],["9","4","Chair","150.00","2023-10-01"],["8","1","Desk Lamp","35.00","2023-09-12"],["7","3","Webcam","70.00","2023-09-05"],["6","2","Tablet","600.00","2023-09-01"],["5","4","Monitor","220.00","2023-08-15"],["4","3","Keyboard","45.00","2023-08-10"],["3","1","Mouse","25.50","2023-07-15"],["2","2","Phone","800.00","2023-07-01"],["1","1","Laptop","1200.00","2023-06-01"],["1","null","Laptop","1200.00","2023-06-01"]],"tableName":"commande-filtered"}')
  }) 
})

