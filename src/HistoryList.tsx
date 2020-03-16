import * as React from 'react'
import { HistoryTypes, HistoryComponent, HistoryItem } from './types'
import historyRenderers from './history'

const HistoryList = ({
  history,
  terminalId,
  promptSymbol
}: HistoryListProps) => (
  <div className={'terminalOutput'}>
    {[...history].reverse().map(({ type, content }, index) => {
      const HistoryComponent = historyRenderers[type]
      return (
        <HistoryComponent
          key={`${terminalId}-${index}-${content.slice(4)}`}
          content={content.toString()}
          promptSymbol={promptSymbol}
        />
      )
    })}
  </div>
)

interface HistoryListProps {
  history: HistoryItem[]
  terminalId: string
  promptSymbol: string
}

export default HistoryList
