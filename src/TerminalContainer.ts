import styled from 'styled-components'
import defaultTheme from './themes/default'
import { Theme } from './types'

const TerminalContainer = styled.div<{
  theme: Theme
}>`
  & > :last-child {
    padding-bottom: ${({ theme = defaultTheme }) => theme.spacing};
  }
  height: ${({ theme = defaultTheme }) => theme.height};
  width: ${({ theme = defaultTheme }) => theme.width};
  line-height: 1.2em;
  padding: ${({ theme = defaultTheme }) => theme.spacing};
  overflow-y: scroll;
  color: ${({ theme = defaultTheme }) => theme.outputColor};
  background: ${({ theme = defaultTheme }) => theme.background};
  font-family: monospace;
  font-size: ${({ theme = defaultTheme }) => theme.fontSize};
`

export default TerminalContainer
