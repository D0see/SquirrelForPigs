import React from 'react'
import './ResultTable.css'

const inferHeaderClass = (table, index) => {
    for (let y = 1; y < table.length; y++) {
        if (table[y][index] !== 'null') {
            return isNaN(table[y][index]) ? '' : 'dataNumber'
        } 
    }
}

export default function ResultTable({table}) {
  return (
    <table className='componentTable'>
        <thead>
            {table[0].map((header, index) => {
                return <th className={inferHeaderClass(table, index)}>{header}</th>
            })}
        </thead>
        <tbody>
            {table.slice(1).map(row => {
                return <tr>{row.map(data => {
                    return <td className={isNaN(data) ? '' : 'dataNumber'}>
                        {data === 'null' ? '' : data}
                    </td>
                })}</tr>
            })}
        </tbody>

    </table>
  )
}
