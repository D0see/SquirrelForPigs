import React from 'react'

import './Button.css'

export default function Button({text, newClass, onClickCallBack}) {
  return (
    <div className={newClass ? newClass :'btn text-body'} onClick={() => {
      onClickCallBack()
      }}>
        {text}
    </div>
  )
}
