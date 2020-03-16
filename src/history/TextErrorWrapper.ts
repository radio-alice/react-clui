import styled from 'styled-components'
import defaultTheme from '../themes/default'

const TextErrorWrapper = styled.div`
  color: ${({ theme = defaultTheme }) => theme.errorOutputColor};
`
export default TextErrorWrapper
