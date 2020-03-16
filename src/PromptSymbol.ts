import styled from 'styled-components'
import defaultTheme from './themes/default'

const PromptSymbol = styled.span`
  margin-right: 0.25em;
  white-space: pre;
  color: ${({ theme = defaultTheme }) => theme.promptSymbolColor};
`

export default PromptSymbol
