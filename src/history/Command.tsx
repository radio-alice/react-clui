import * as React from 'react'
import PromptSymbol from '../PromptSymbol'
import HistoryContainer from './HistoryContainer'
import TextCommandWrapper from './TextCommandWrapper'

const Command = ({ content, promptSymbol }: CommandProps) => (
  <HistoryContainer>
    <PromptSymbol>{promptSymbol}</PromptSymbol>
    <TextCommandWrapper>{content}</TextCommandWrapper>
  </HistoryContainer>
)

type content = { command: string }
export interface CommandProps {
  content: content
  promptSymbol: string
}

export default Command
