import { useState } from 'react'
import QueryEntry from './components/QueryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import Header from './components/header/header.jsx'
import AccordionHeader from './components/AccordionHeader/AccordionHeader.jsx'
import './App.css'
import Accordion from './components/Accordion/Accordion.jsx'
import ColumnList from './components/ColumnList/ColumnList.jsx'

import TableIcon from './assets/icons/Table.svg?react' 
import BookIcon from './assets/icons/book.svg?react'

import testingJson from '../data/testingJson.json'
import ResultTable from './components/ResultTable/ResultTable.jsx'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryEntry/>
      <br/>
      <Button text={'Submit'}/>
      <br/>
      <Header label={'header'} hasIcon={true} hasRightIcon={true}/>
      <br/>
      <Accordion Icon={BookIcon} header={'Instructions'}>
        <p className='text-body'>select all people from people</p>
      </Accordion>

      {testingJson.tables.map((table, index) => {
        return <Accordion key={'table ' + index} Icon={TableIcon} header={table.tableName}>
        <ColumnList columnDetails={table.columnDetails} columns={table.table[0]}/>
      </Accordion>
      })}
      <ResultTable table={testingJson.expectedResult.table}/>
    </>
  )
}

export default App
