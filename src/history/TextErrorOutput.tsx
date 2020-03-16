import * as React from 'react'
import HistoryContainer from './HistoryContainer'
import TextErrorWrapper from './TextErrorWrapper'
import { TextOutputProps } from './TextOutput'

const TextErrorOutput = ({ content }: TextOutputProps) => (
  <TextErrorWrapper>
    <HistoryContainer>{content}</HistoryContainer>
  </TextErrorWrapper>
)

export default TextErrorOutput
