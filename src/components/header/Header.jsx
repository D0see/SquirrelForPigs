import React from 'react'

import './Header.css'

export default function Header({label, Icon}) {
  return (
    <div className='sectionHeader'>
        <Icon className='icon'/>
        <h2 className='text-header label'>{label}</h2>
    </div>
  )
}
