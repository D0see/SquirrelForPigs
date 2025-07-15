import { tableObjToHTMLTable } from './utils/tableDisplayer.mjs'
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
        const htmlTable = tableObjToHTMLTable(newTable, "queryResult")
        queryResultVisualizer.appendChild(htmlTable)
    };
})
