import React from 'react'

import './Button.css'
import Logo from '../../assets/icons/book.svg?react'

export default function Button({text}) {
  return (
    <div className='btn text-body'>
        {text}
    </div>
  )
}
