import { twoDArrToHTMLTable } from './services/tableDisplayer.mjs'
import { sqlSelect, sqlLeftJoin } from './services/sqlFunctions.mjs'
import { SqlParser } from './services/sqlParser.mjs';
import testingData from './testing/testingData.mjs';

const body = document.querySelector('body');

const sqlTextArea = document.getElementById("sqlQueryEntry");
const sqlQuerySubsmissionButton = document.getElementById("sqlQuerySubmitButton");

const tables = testingData;

sqlQuerySubsmissionButton.addEventListener("click", (e) => {
    const newTable = SqlParser(sqlTextArea.value, tables);
    body.appendChild(twoDArrToHTMLTable(newTable));
})

// const parserTest = SqlParser('SELECT firstName occupation jobId FROM people LEFTJOIN job on jobId = id', tables);


