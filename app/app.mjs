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
        console.log(JSON.stringify(newTable));
    } catch(e) {
        errorMessage.innerText = e.message + '\n' + e.stack;
        return;
    }
    if (newTable) {
        queryResultVisualizer.appendChild(twoDArrToHTMLTable(newTable, "queryResult"))
    };
})

/* WORKING

SELECT p.id p.firstName j1.occupation s1.salary m.id m.firstName m.lastName j2.occupation s2.salary FROM people AS p LEFTJOIN people AS m on p.idManager = m.id LEFTJOIN job AS j1 on p.jobId = j1.id LEFTJOIN job AS j2 on m.jobId = j2.id LEFTJOIN salary AS s1 on j1.idSalary = s1.id LEFTJOIN salary AS s2 on j2.idSalary = s2.id

/* DOESNT WORK

*/