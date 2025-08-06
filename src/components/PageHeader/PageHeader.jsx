import React from 'react'
import './PageHeader.css'

export default function PageHeader({currStageNumber, numberOfStages}) {
  return (
    <header class="page-header">
        <div class="logo h2">Squirrel for Pigs</div>

        <div class="game-info-container">
            <div class="medal-icon">
            </div>
            <p class="text-header stage-number">{`${currStageNumber}/${numberOfStages}`}</p>
        </div>
    </header>
  )
}
