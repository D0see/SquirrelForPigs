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