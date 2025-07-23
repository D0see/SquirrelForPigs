import { useState } from 'react'
import QueryEntry from './components/QueryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import Header from './components/header/header.jsx'
import AccordionHeader from './components/AccordionHeader/AccordionHeader.jsx'
import './App.css'
import Accordion from './components/Accordion/Accordion.jsx'
import ColumnList from './components/ColumnList/ColumnList.jsx'
import TableColumn from './components/TableColumn/TableColumn.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QueryEntry/>
      <Button text={'Submit'}/>
      <AccordionHeader text={'People'} hasRightIcon={true} isOpened={false} hugContent={true}/>
      <AccordionHeader text={'Job'} hasRightIcon={true} isOpened={true} hugContent={true}/>
      <Header label={'header'} hasIcon={true} hasRightIcon={true}/>
      <TableColumn name='id'/>
      <ColumnList columns={['id', 'name', 'occupation']}/>
      <br/>
      <Accordion header={'TableTest'}>
        <ColumnList columns={['id', 'name', 'occupation']}/>
      </Accordion>
      <br/>
      <Accordion header={'TableTest'}>
        <ColumnList columns={['id', 'name', 'occupation']}/>
      </Accordion>
    </>
  )
}

export default App
