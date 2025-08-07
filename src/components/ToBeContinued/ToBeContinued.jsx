import React from 'react'
import GithubIcon from '../../assets/icons/github.svg?react'
import LinkedinIcon from '../../assets/icons/linkedin.svg?react'


import './ToBeContinued.css'

export default function ToBeContinued() {
  return (
    <div className='tbc-container'>
          <div className='text-body'>
            <div className='tbc-text'>to be continued...</div>
          <div className='socials'>
            <div className='social-container'>
              <a href='https://github.com/D0see/SquirrelForPigs'><GithubIcon className="social-icon"/></a>
            </div>
            <div className='social-container'>
              <a href='https://www.linkedin.com/in/leo-lesueur-750102273/'><LinkedinIcon/></a>            
            </div>
          </div>
      </div>
    </div>

  )
}
