import React from 'react'
import PkIcon from '../../assets/icons/keybadge.svg?react'
import FkIcon from '../../assets/icons/keybadge-1.svg?react'


import './TableColumn.css'

export default function TableColumn({name, detail}) {
  return (
    <div className='table-column text-body'>
      {name}
      {detail === 'PK' ? <PkIcon/> : ''}
      {detail === 'FK' ? <FkIcon/> : ''}
    </div>
  )
}
