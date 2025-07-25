import React from 'react'
import Button from '../button/Button.jsx';
import SadFace from '../../assets/icons/smile-face.svg?react'
import './AlertBar.css'

const renderSwitchMessage = (state, errorMessage) => {
    switch(state) {
        case 'success' :
            return <div className='label'>this is a success</div>
        case 'warning' :
            return <div className='label'>this is a warning</div>
        case 'error' :
            return <div className='label'>this is a an error : {errorMessage}</div>
        case 'waiting' :
            return <div className='label'>waiting for an input</div>
    }
}

const renderSwitchIcon = (state) => {
    return <SadFace className='icon'/>
}

export default function AlertBar({state, errorMessage}) {
  return (
  <div className='alertwrapper'>
    <div className='alert' data-type={state}>
        {renderSwitchIcon(state)}
        {renderSwitchMessage(state, errorMessage)}
    </div>
    {state === 'success' ? 
    <Button newClass={'alert-btn'} text={'next'}/> : ''
    }
  </div>
  )
}
