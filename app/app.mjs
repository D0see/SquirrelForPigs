import { twoDArrToHTMLTable } from './utils/tableDisplayer.mjs'
import { SqlParser } from './parser/sqlParser.mjs';
import testingData from './testing/testingData.mjs';

const body = document.querySelector('body');

const sqlTextArea = document.getElementById("sqlQueryEntry");
const errorMessage = document.getElementById("errorMessage");
const sqlQuerySubsmissionButton = document.getElementById("sqlQuerySubmitButton");
const queryResultVisualizer = document.getElementById("queryResultVisualizer")

const tables = testingData;

sqlQuerySubsmissionButton.addEventListener("click", (e) => {
    let newTable;
    queryResultVisualizer.innerHTML = null;
    errorMessage.innerHTML = null;
    try {
        newTable = SqlParser(sqlTextArea.value, structuredClone(tables));
    } catch(e) {
        errorMessage.innerText = e.message + '\n' + e.stack;
        return;
    }
    if (newTable) {
        queryResultVisualizer.appendChild(twoDArrToHTMLTable(newTable, "queryResult"))
    };
})

/* WORKING

SELECT firstName occupation FROM people LEFTJOIN job on jobId = id

SELECT firstName occupation salary FROM people AS p LEFTJOIN job on p.id = job.id LEFTJOIN salary on job.idSalary = id

SELECT p.firstName m.firstName m.lastName FROM people AS p LEFTJOIN people AS m on p.idManager = m.id

SELECT p.firstName j1.occupation m.firstName m.lastName j2.occupation FROM people AS p LEFTJOIN people AS m on p.idManager = m.id LEFTJOIN job AS j1 on p.jobId = j1.id LEFTJOIN job AS j2 on m.jobId = j2.id


/* DOESNT WORK

*/