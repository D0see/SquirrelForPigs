import { useState } from 'react'
import QueryEntry from './components/queryEntry/QueryEntry.jsx'
import Button from './components/button/Button.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QueryEntry/>
      <Button name={'Submit'} hasIcon={true}/>
      <Button name={'Submit'} hasIcon={false}/>
    </>
  )
}

export default App
