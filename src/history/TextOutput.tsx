import * as React from 'react'
import HistoryContainer from './HistoryContainer'

const TextOutput = ({ content }: TextOutputProps) => (
  <HistoryContainer>{content}</HistoryContainer>
)

export interface TextOutputProps {
  content: string
}

export default TextOutput
