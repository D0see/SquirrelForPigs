import React from 'react'
import './QueryEntry.css'

export default function QueryEntry({handleQueryChange, val}) {

  return (
    <textarea value={val} onChange={handleQueryChange} className='customTextarea' placeholder="Write your query here..."></textarea>
  )
}
