# SquirrelForPigs

# REACT FRONT-END

### REWRITE THE WHOLE PARSER USING A LEXER AND AST

### BUGS 
- strings with spaces are not handled properly

### QUERY ENTRY
- build an uppercase minitel font to trick slate into doing what i want
- i should use underscore instead of "-" for better token recognition by monaco

# SQL ENGINE

## MISSING FEATURES :

- GROUP BY => WOULD BE NICE TO HAVE
### VALIDATE FUNCTION
- SQL PARSER SHOULD HAVE A FUNCTION TO VALIDATE ITS CLAUSES
### Parsing
- should be able to target tables with reserved keyword using "" or '' in the column name (not really important for a functionnal app)

## CODE QUALITY ISSUES :

### FUNCTIONS
- should make all my funcions pure
- comments above my function should be in jsdoc format
- Not a fan of how i create discriminating headers which necessitate weird logic for comparison with KEYWORD ON
## TESTS
- need more tests for data comparison
- should be made modular based on the keywords on appConsts
- findTableInTableArray -> update tests
- must test full outer join further

# quirks

## types
- all table cell values are string under the hood and the type they represent are infered if needed
### COMPARISON 
- if two differents types are compared, throws an error since i couldnt decide which dialect to emulate (you probably shouldnt do it anyways)