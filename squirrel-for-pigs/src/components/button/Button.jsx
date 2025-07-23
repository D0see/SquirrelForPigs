import React from 'react'

import './Button.css'
import Logo from '../../assets/icons/book.svg?react'

export default function Button({name, hasIcon}) {
  return (
    <div className='btn text-body'>
        {hasIcon &&
        <Logo/>
        }
        <div>{name}</div>
    </div>
  )
}
