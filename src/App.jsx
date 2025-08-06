import { useState } from 'react'
import './App.css'

import PageHeader from './components/PageHeader/PageHeader'
import QueryEntry from '@components/QueryEntry/QueryEntry.jsx'
import Button from '@components/button/Button.jsx'
import Header from '@components/header/Header.jsx'
import Accordion from '@components/Accordion/Accordion.jsx'
import ColumnList from '@components/ColumnList/ColumnList.jsx'
import ResultTable from '@components/ResultTable/ResultTable.jsx'
import AlertBar from '@components/AlertBar/AlertBar.jsx'

import TableIcon from '@assets/icons/Table.svg?react' 
import BookIcon from '@assets/icons/book.svg?react'
import Database from '@assets/icons/database.svg?react'
import Flag from '@assets/icons/flag.svg?react'
import Notepad from '@assets/icons/notepad-edit.svg?react'

import { levels } from '@data/levels.json'

import { queryStateMap } from '@utils/appConsts.js'
import { sqlParser } from '@features/sqlEngine/parser/sqlParser.js'
import { validateResult } from '@utils/gameLogic.js'


function App() {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([[]]);
  const [queryState, setQueryState] =  useState(queryStateMap.waiting);
  const [errorMessage, setErrorMessage] = useState('');
  const [currLevelIndex, setCurrLevelIndex] = useState(3);
  const currLevel = levels[currLevelIndex];
  
  const handleQueryChange = (value, e) => {
    setQuery((_) =>  value)
  }

  const handleSubmit = () => {
    let parsedUserQueryResult = [[]];

    //Parser error catching
    try {
      const clonedTables = structuredClone(currLevel.tables);
      parsedUserQueryResult = sqlParser(query, clonedTables).table;
    } catch(e) {
      setErrorMessage(e.message); 
      setQueryState(queryStateMap.error)
      return;
    }

    //Wrong result error catching
    try {
      const isCorrectAnswer = validateResult(currLevel, parsedUserQueryResult);
      setQueryState(isCorrectAnswer ? queryStateMap.success : queryStateMap.warning);
      setErrorMessage('invalid result');
    } catch(e) {
      setQueryState(queryStateMap.warning);
      setErrorMessage(e.message);
    }
    setQueryResult(parsedUserQueryResult);
  }

  const handleNext = () => {
    setCurrLevelIndex(prev => prev + 1);
    setQuery('');
    setQueryState(queryStateMap.waiting);
    setErrorMessage('');
    setQueryResult([[]]);
  }

  return (
    <div className='crt'>
    <PageHeader numberOfStages={levels.length} currStageNumber={currLevelIndex + 1}/>
    <div className='app-container'>
      <div className='interface-container'>
        <div className='database-container'>
          <Header label={'Database'} Icon={Database}/>
          {currLevel.tables.map((table, index) => {
            return <Accordion key={table.tableName + index} Icon={TableIcon} header={table.tableName} startsOpened={false}>
            <ColumnList columnDetails={table.columnDetails} columns={table.table[0]}/>
          </Accordion>
          })}
        </div>

        <div className='main-container'>
          <div className='sub-container'>
            <Accordion Icon={BookIcon} header={'Instructions'} startsOpened={true}>
              {currLevel.instruction.split('\n').map((line, index) => 
                <p className='text-body' key={index}>{line}</p>
              )}
            </Accordion>
          </div>
          <div className='sub-container'>
            <Header label={'Query'} Icon={Notepad}/>
            <QueryEntry query={query} handleQueryChange={handleQueryChange}/>
            <div className='alert-wrapper'>
              <AlertBar state={queryState} errorMessage={errorMessage} handleNext={handleNext}/>
              {queryState !== queryStateMap.success ? <Button text={'Submit'} onClickCallBack={handleSubmit}/> : ''}
            </div>
          </div>
          <div className='sub-container'>
            <Header label={'Result'} Icon={Flag}/>
            <ResultTable table={queryResult}/>
          </div>
        </div>

      </div>
    </div>
    <div className='scanLine'></div>
    </div>
  )
}

export default App
