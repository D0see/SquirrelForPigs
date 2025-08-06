import React from 'react'

import './AccordionHeader.css'
import DownArrow from '../../assets/icons/down-arrow.svg?react'
import UpArrow from '../../assets/icons/up-arrow.svg?react'


export default function AccordionHeader({Icon, text, isOpened, onClick, hugContent}) {
  return (
    <div className='accordion-header text-header' onClick={onClick}>
      <div className='left-content'>
        {Icon ?
        <Icon/> :''
        }
        <h2 className='no-select'>{text}</h2>
      </div>
        {
          isOpened ?
          (<UpArrow className='arrow'/>):
          (<DownArrow className='arrow'/>)
        }
    </div>
  )
}
