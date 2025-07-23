import React from 'react'

import './Button.css'
import Logo from '../../assets/icons/book.svg?react'

export default function Button({text, hasIcon}) {
  return (
    <div className='btn text-body'>
        {hasIcon &&
        <Logo className='icon'/>
        }
        <div>{text}</div>
    </div>
  )
}
