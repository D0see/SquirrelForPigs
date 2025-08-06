import React from 'react'
import './PageHeader.css'

export default function PageHeader({currStageNumber, numberOfStages}) {
  return (
    <header className="page-header">
        <div className="logo h2">Squirrel for Pigs</div>

        <div className="game-info-container">
            <div className="medal-icon">
            </div>
            <p className="text-header stage-number">{`${currStageNumber}/${numberOfStages}`}</p>
        </div>
    </header>
  )
}
