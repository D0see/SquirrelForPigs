import { twoDArrToHTMLTable } from './services/tableDisplayer.mjs'
import { SqlParser } from './services/sqlParser.mjs';
import testingData from './testing/testingData.mjs';

const body = document.querySelector('body');

const sqlTextArea = document.getElementById("sqlQueryEntry");
const sqlQuerySubsmissionButton = document.getElementById("sqlQuerySubmitButton");

const tables = testingData;

sqlQuerySubsmissionButton.addEventListener("click", (e) => {
    const newTable = SqlParser(sqlTextArea.value, structuredClone(tables));
    body.appendChild(twoDArrToHTMLTable(newTable));
})

//SELECT firstName occupation FROM people LEFTJOIN job on jobId = id

//SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id LEFTJOIN salary on job.idSalary = id

//SELECT p.firstName m.firstName m.lastName FROM people AS p LEFTJOIN people AS m on p.idManager = m.id