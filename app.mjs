import { twoDArrToHTMLTable } from './services/tableDisplayer.mjs'
import { sqlSelect, sqlLeftJoin } from './services/sqlFunctions.mjs'
import { SqlParser } from './services/sqlParser.mjs';
import testingData from './testing/testingData.mjs';

const body = document.querySelector('main');
body.appendChild(twoDArrToHTMLTable(testingData.testTable1))

const tables = [testingData.testTable1, testingData.testTable2];

console.log(sqlSelect(['firstName'], tables[0]));


const selectFirstName = sqlSelect(['firstName'], tables[0])
body.appendChild(twoDArrToHTMLTable(selectFirstName));

const UserjoinedOnJob = sqlLeftJoin(tables[0], tables[1], 'jobId', 'id', '=');

body.appendChild(twoDArrToHTMLTable(UserjoinedOnJob));

const filteredTable = sqlSelect(['firstName', 'lastName', 'occupation'], UserjoinedOnJob)
body.appendChild(twoDArrToHTMLTable(filteredTable));

const parserTest = SqlParser('people LEFTJOIN job on jobId = id', tables);

body.appendChild(twoDArrToHTMLTable(parserTest));


