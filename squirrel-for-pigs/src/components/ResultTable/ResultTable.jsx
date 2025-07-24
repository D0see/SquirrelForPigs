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
            <tr>
            {table[0].map((header, index) => {
                return <th className={inferHeaderClass(table, index)} key={'header' + index}>{header}</th>
            })}
            </tr>
        </thead>
        <tbody>
            {table.slice(1).map((row, indexRow) => {
                return <tr key={indexRow + 'row'}>{row.map((data, indexData) => {
                    return <td className={isNaN(data) ? '' : 'dataNumber'} key={indexRow + 'data' + indexData}>
                        {data === 'null' ? '' : data}
                    </td>
                })}</tr>
            })}
        </tbody>

    </table>
  )
}
