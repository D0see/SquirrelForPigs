import { useState } from 'react'
import QueryEntry from './components/queryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import Header from './components/header/header.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QueryEntry/>
      <Button text={'Submit'} hasIcon={true}/>
      <Button text={'Submit'} hasIcon={false}/>
      <Header label={'testlabel'} hasIcon={true}/>
    </>
  )
}

export default App
