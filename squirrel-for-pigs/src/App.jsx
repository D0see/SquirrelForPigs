import { useState } from 'react'
import QueryEntry from './components/QueryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import Header from './components/header/header.jsx'

import './App.css'
import Accordion from './components/Accordion/Accordion.jsx'
import ColumnList from './components/ColumnList/ColumnList.jsx'

import TableIcon from './assets/icons/Table.svg?react' 
import BookIcon from './assets/icons/book.svg?react'
import Database from './assets/icons/database.svg?react'
import Flag from './assets/icons/flag.svg?react'
import Notepad from './assets/icons/notepad-edit.svg?react'


import testingJson from '../data/testingJson.json'
import level1 from '../data/level1.json'
import ResultTable from './components/ResultTable/ResultTable.jsx'
import AlertBar from './components/AlertBar/AlertBar.jsx'

function App() {

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
            <QueryEntry/>
            <div className='alert-wrapper'>
              <AlertBar state={'waiting'} errorMessage={''}/>
              <Button text={'Submit'}/>
            </div>
          </div>
          <Header label={'Result'} Icon={Flag}/>
          <ResultTable table={level1.tables[0].table}/>
        </div>
      </div>

  )
}

export default App
