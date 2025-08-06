import React from 'react'
import Button from '../button/Button.jsx';
import SmileFace from '../../assets/icons/smile-face.svg?react'
import SadFace from '../../assets/icons/sad-face.svg?react'
import SkepticFace from '../../assets/icons/skeptic-face.svg?react'
import NeutralFace from '../../assets/icons/neutral-face.svg?react'
import './AlertBar.css'

const renderSwitchMessage = (state, errorMessage) => {
    switch(state) {
        case 'success' :
            return <div className='label'>assignement completed</div>
        case 'warning' :
            return <div className='label'>{errorMessage}</div>
        case 'error' :
            return <div className='label'>{errorMessage}</div>
        case 'waiting' :
            return <div className='label'>waiting for a query</div>
    }
}

const renderSwitchIcon = (state) => {
    switch(state) {
        case 'success' :
            return <SmileFace className='icon'/>
        case 'warning' :
            return <SkepticFace className='icon'/>
        case 'error' :
            return <SadFace className='icon'/>
        case 'waiting' :
            return <NeutralFace className='icon'/>
    }
    return <SadFace className='icon'/>
}

export default function AlertBar({state, errorMessage, handleNext}) {
  return (
  <div className='alertwrapper'>
    <div className='alert' data-type={state}>
        {renderSwitchIcon(state)}
        {renderSwitchMessage(state, errorMessage)}
    </div>
    {state === 'success' ? 
    <Button newClass={'alert-btn btn text-body'} text={'next'} onClickCallBack={handleNext}/> : ''
    }
  </div>
  )
}
