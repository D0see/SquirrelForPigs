import React from 'react'
import PkIcon from '../../assets/icons/keybadge.svg?react'

import './TableColumn.css'

export default function TableColumn({name}) {
  return (
    <div className='table-column text-body'>
      {name}
    </div>
  )
}
