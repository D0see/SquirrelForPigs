import React from 'react'
import TableColumn from '../TableColumn/TableColumn'

import './ColumnList.css'

export default function ColumnList({columns, columnDetails}) {
  return (
    <>
    {columns.map((val, index) => <TableColumn detail={columnDetails[index]} key={index} name={val} />)} 
    </>
  )
}
