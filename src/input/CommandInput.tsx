import * as React from 'react'
import StyledInput from './StyledInput'
import StyledForm from './StyledForm'
import PromptSymbol from '../PromptSymbol'
import Options from './Options'
import styled from 'styled-components'

const CommandInput = ({
  promptSymbol,
  value,
  onChange,
  onKeyDown,
  options,
  cursorPosition
}: CommandInputProps) => {
  console.log(cursorPosition)
  const inputRef = React.useRef(null)
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [inputRef.current])
  return (
    <div>
      <StyledForm onKeyDown={onKeyDown}>
        <PromptSymbol>{promptSymbol}</PromptSymbol>
        <InputContainer>
          <StyledInput onChange={onChange} value={value} ref={inputRef} />
          <Options options={options} cursorPosition={cursorPosition} />
        </InputContainer>
      </StyledForm>
    </div>
  )
}

interface CommandInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyDownHandler
  promptSymbol: string
  value: string
  options: any
  cursorPosition: number
}

interface KeyDownHandler {
  (e: React.KeyboardEvent): void
}

const InputContainer = styled.div`
  position: relative;
`

export default CommandInput
