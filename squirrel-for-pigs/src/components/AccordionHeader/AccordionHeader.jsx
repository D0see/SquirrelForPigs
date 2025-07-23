import React from 'react'

import './AccordionHeader.css'
import DownArrow from '../../assets/icons/down-arrow.svg?react'
import UpArrow from '../../assets/icons/up-arrow.svg?react'


export default function AccordionHeader({text, isOpened, onClick, hugContent}) {
  return (
    <div className='accordion-header text-body' onClick={onClick}>
        {text}
        {
          isOpened ?
          (<UpArrow className='icon'/>):
          (<DownArrow className='icon'/>)
        }
        
    </div>
  )
}
