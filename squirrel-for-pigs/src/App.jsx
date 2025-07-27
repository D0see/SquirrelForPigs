import { useState } from 'react'
import './App.css'

import QueryEntry from './components/QueryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import Header from './components/header/header.jsx'
import Accordion from './components/Accordion/Accordion.jsx'
import ColumnList from './components/ColumnList/ColumnList.jsx'
import ResultTable from './components/ResultTable/ResultTable.jsx'
import AlertBar from './components/AlertBar/AlertBar.jsx'

import TableIcon from './assets/icons/Table.svg?react' 
import BookIcon from './assets/icons/book.svg?react'
import Database from './assets/icons/database.svg?react'
import Flag from './assets/icons/flag.svg?react'
import Notepad from './assets/icons/notepad-edit.svg?react'

import testingJson from '../data/testingJson.json'
import level1 from '../data/level1.json'

import { queryStateMap } from './utils/appConsts.js'
import { SqlParser } from './features/sqlEngine/parser/sqlParser.mjs'
import { validateResult } from './utils/gameLogic.js'


function App() {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([[]]);
  const [queryState, setQueryState] =  useState(queryStateMap.waiting)
  const [errorMessage, setErrorMessage] = useState('')
  // const [levelTables, setLevelTables] = useState(testingJson.tables);

  const handleSubmit = () => {
    const clonedTables = structuredClone(level1.tables);
    let parsedUserQueryResult = [[]];

    //Parser error catching
    try {
        parsedUserQueryResult = SqlParser(query, clonedTables).table;
    } catch(e) {
        setErrorMessage(e.message);
        setQueryState(queryStateMap.error)
        return;
    }

    //Wrong result error catching
    try {
      const isCorrectAnswer = validateResult(level1, parsedUserQueryResult);
      setQueryState(isCorrectAnswer ? queryStateMap.success : queryStateMap.warning);
      setErrorMessage('wrong answer');
    } catch(e) {
      setQueryState(queryStateMap.warning);
      setErrorMessage(e.message);
    }
    setQueryResult(parsedUserQueryResult);
  }

  return (
      <div className='app-container'>

        <div className='database-container'>
          <Header label={'Database'} Icon={Database}/>
          {level1.tables.map((table, index) => {
            return <Accordion key={'table ' + index} Icon={TableIcon} header={table.tableName}>
            <ColumnList columnDetails={table.columnDetails} columns={table.table[0]}/>
          </Accordion>
          })}
        </div>

        <div className='main-container'>
          <Accordion Icon={BookIcon} header={'Instructions'}>
            <p className='text-body'>{level1.instruction}</p>
          </Accordion>
          <Header label={'Query'} Icon={Notepad}/>

          <div className='query-container'>
            <QueryEntry setQuery={setQuery}/>
            <div className='alert-wrapper'>
              <AlertBar state={queryState} errorMessage={errorMessage}/>
              <Button text={'Submit'} onClickCallBack={handleSubmit}/>
            </div>
          </div>

          <Header label={'Result'} Icon={Flag}/>
          <ResultTable table={queryResult}/>
        </div>

      </div>

  )
}

export default App
