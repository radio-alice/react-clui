import * as React from 'react'
import StyledInput from './StyledInput'
import StyledForm from './StyledForm'
import PromptSymbol from '../PromptSymbol'
import Options from './Options'

const CommandInput = ({
  promptSymbol,
  value,
  onChange,
  onSubmit,
  onKeyDown,
  options
}: CommandInputProps) => {
  const inputRef = React.useRef(null)
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [inputRef.current])
  return (
    <div className={'terminalInput'}>
      <StyledForm
        onKeyDown={onKeyDown}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          onSubmit(value)
        }}
      >
        <PromptSymbol>{promptSymbol}</PromptSymbol>
        <StyledInput onChange={onChange} value={value} ref={inputRef} />
      </StyledForm>
      <Options options={options} />
    </div>
  )
}

interface CommandInputProps {
  onSubmit: SubmitHandler
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyDown: KeyDownHandler
  promptSymbol: string
  value: string
  options: any
}

interface KeyDownHandler {
  (e: React.KeyboardEvent): void
}

interface SubmitHandler {
  (x: string): void
}
export default CommandInput
