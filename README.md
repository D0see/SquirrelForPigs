# SquirrelForPigs

GROUP BY => WOULD BE NICE TO HAVE

### ORDER BY 
- should handle ASC and DESC KEYWORDS

### VALIDATE FUNCTION
SQL PARSER SHOULD HAVE A FUNCTION TO VALIDATE ITS CLAUSES

### Parsing
- should be able to target tables with reserved keyword using "" or '' in the column name

### TESTS
-need more tests for data comparison

### ERROR
- replace hardcoded error messages

### WHERE CLAUSE

### FUNCTIONS
- should make all my funcions pure
- comments above my function should be in jsdoc format

### JOINING
- Not a fan of how i create discriminating headers which necessitate weird logic for comparison with KEYWORD ON

### keywords
- implement FULL OUTER JOIN

### TESTS
- should be made modular based on the keywords on appConsts

#### files

### sqlParser.helper.mjs
- findTableInTableArray -> update tests

# quirks

## types
- all table cell values are string under the hood and the type they represent are infered if needed
### COMPARISON 
- if two differents types are compared, throws an error since i couldnt decide which dialect to emulate (you probably shouldnt do it anyways)
