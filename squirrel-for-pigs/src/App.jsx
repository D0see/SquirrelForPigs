import { useState } from 'react'
import QueryEntry from './components/QueryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import Header from './components/header/header.jsx'

import './App.css'
import Accordion from './components/Accordion/Accordion.jsx'
import ColumnList from './components/ColumnList/ColumnList.jsx'

import TableIcon from './assets/icons/Table.svg?react' 
import BookIcon from './assets/icons/book.svg?react'

import testingJson from '../data/testingJson.json'
import level1 from '../data/level1.json'
import ResultTable from './components/ResultTable/ResultTable.jsx'
import AlertBar from './components/AlertBar/AlertBar.jsx'

function App() {
  const [count, setCount] = useState(0);
  console.log("hey", level1)

  return (
    <>
      <QueryEntry/>
      <br/>
      <AlertBar state={'success'} errorMessage={''}/>
      <br/>
      <AlertBar state={'waiting'} errorMessage={''}/>
      <br/>
      <AlertBar state={'error'} errorMessage={''}/>
      <br/>
      <AlertBar state={'warning'} errorMessage={''}/>
      <br/>
      <Button text={'Submit'}/>
      <br/>
      <Header label={'header'} hasIcon={true} hasRightIcon={true}/>
      <br/>
      <Accordion Icon={BookIcon} header={'Instructions'}>
        <p className='text-body'>{level1.instruction}</p>
      </Accordion>

      {level1.tables.map((table, index) => {
        return <Accordion key={'table ' + index} Icon={TableIcon} header={table.tableName}>
        <ColumnList columnDetails={table.columnDetails} columns={table.table[0]}/>
      </Accordion>
      })}
      <ResultTable table={level1.tables[0].table}/>
    </>
  )
}

export default App
