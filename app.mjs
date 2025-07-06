import { twoDArrToHTMLTable } from './services/tableDisplayer.mjs'
import { sqlSelect, sqlLeftJoin } from './services/sqlFunctions.mjs'
import { SqlParser } from './services/sqlParser.mjs';
import testingData from './testing/testingData.mjs';

const body = document.querySelector('main');

const tables = testingData;

const parserTest = SqlParser('SELECT firstName occupation FROM people LEFTJOIN job on jobId = id', tables);

body.appendChild(twoDArrToHTMLTable(parserTest));


