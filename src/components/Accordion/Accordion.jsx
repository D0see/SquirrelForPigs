import React from 'react'
import AccordionHeader from '../AccordionHeader/AccordionHeader.jsx'
import AccordionBody from '../AccordionBody/AccordionBody.jsx'
import { useState } from 'react'

import './Accordion.css'

export default function Accordion({header, Icon, children}) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={`accordion ${clicked ? 'open-accordion' : ''}`}>
      <AccordionHeader Icon={Icon} text={header} isOpened={clicked} onClick={() => setClicked(!clicked)}/>
      {clicked ? 
      <AccordionBody>
        {children}
      </AccordionBody>
      : null}
    </div>
  )
}
