import React from 'react'
import TableColumn from '../TableColumn/TableColumn'

export default function ColumnList({columns}) {
  return (
    <>
    {columns.map((val, index) => <TableColumn key={index} name={val} />)} 
    </>
  )
}
