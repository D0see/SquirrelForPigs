import { useState } from 'react'
import QueryEntry from './components/QueryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import Header from './components/header/header.jsx'
import AccordionHeader from './components/AccordionHeader/AccordionHeader.jsx'
import './App.css'
import Accordion from './components/Accordion/Accordion.jsx'
import ColumnList from './components/ColumnList/ColumnList.jsx'

import TableIcon from './assets/icons/Table.svg?react' 

import testingJson from '../data/testingJson.json'
import ResultTable from './components/ResultTable/ResultTable.jsx'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryEntry/>
      <Button text={'Submit'}/>
      <AccordionHeader text={'People'} hasRightIcon={true} isOpened={false} hugContent={true}/>
      <AccordionHeader text={'Job'} hasRightIcon={true} isOpened={true} hugContent={true}/>
      <Header label={'header'} hasIcon={true} hasRightIcon={true}/>
      <br/>

      {testingJson.tables.map(table => {
        return <Accordion Icon={TableIcon} header={table.tableName}>
        <ColumnList columns={table.table[0]}/>
      </Accordion>
      })}
      <ResultTable table={testingJson.expectedResult.table}/>
    </>
  )
}

export default App
