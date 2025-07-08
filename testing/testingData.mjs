export default {
    people : {
        table : [
        ['id', 'firstName', 'lastName', 'jobId'],
        ['1', 'John', 'Doe', '1'],
        ['2', 'Jane', 'Doe', '2'],
        ['3', 'Bob', 'Dylan', '4'],
        ['4', 'Cillian', 'Murphy', '4'],
        ['4', 'Jobless', 'Murphy', '1']
    ], 
        tableName : 'people'
    },
    job : {
        table : [
        ['id', 'occupation', 'idSalary'],
        ['1', 'Mason', '1'],
        ['2', 'Plumber','2'],
        ['3', 'Bouncer','2'],
        ['4', 'Barman'],
    ],
        tableName : "job"
    },
    salary : {
        table : [
        ['thisId', 'salary'],
        ['1', '10000'],
        ['2', '15000'],
        ['3', '20000'],
    ],
        tableName : "salary"
    },
}