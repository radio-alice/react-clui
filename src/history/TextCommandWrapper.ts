import styled from 'styled-components'
import defaultTheme from '../themes/default'

const TextCommandWrapper = styled.span`
  color: ${({ theme = defaultTheme }) => theme.commandColor};
`

export default TextCommandWrapper
