import { twoDArrToHTMLTable } from './services/tableDisplayer.mjs'
import { sqlSelect,sqlJoin } from './services/sqlFunctions.mjs'
import testingData from './testing/testingData.mjs';

const body = document.querySelector('main');
body.appendChild(twoDArrToHTMLTable(testingData.testTable1.table))

const tables = [testingData.testTable1, testingData.testTable2];

console.log(sqlSelect(['firstName'], tables[0]));


const selectFirstName = sqlSelect(['firstName'], tables[0])
body.appendChild(twoDArrToHTMLTable(selectFirstName));

const joinOnId = sqlJoin(tables[0], tables[1], 'id', 'idUser', '=');

body.appendChild(twoDArrToHTMLTable(joinOnId));
