import React from 'react'
import './QueryEntry.css'

export default function QueryEntry({setQuery}) {
  const handleInputChange = (e) => {
    setQuery((_) =>  e.target.value)
  }

  return (
    <textarea onChange={handleInputChange} className='customTextarea' placeholder="Your awesome query..."></textarea>
  )
}
