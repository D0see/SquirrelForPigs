import React from 'react'

import './Button.css'
import Logo from '../../assets/icons/book.svg?react'

export default function Button({text, newClass}) {
  return (
    <div className={newClass ? newClass :'btn text-body'}>
        {text}
    </div>
  )
}
