import React from 'react'
import Logo from '../../assets/icons/book.svg?react'

import './Header.css'

export default function Header({label, hasIcon}) {
  return (
    <div className='sectionHeader'>
        {hasIcon &&
        <Logo className='icon'/>
        }
        <div className='text-header label'>{label}</div>
    </div>
  )
}
