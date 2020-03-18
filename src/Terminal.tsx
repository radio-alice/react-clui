import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { Theme } from './types'
import defaultTheme from './themes/default'
import CommandInput from './input/CommandInput'
import HistoryList from './HistoryList'
import TerminalContainer from './TerminalContainer'
import useCluiInput from './useCluiInput'
import { initCommands } from './Commands'
import useTerminalHistory from './useTerminalHistory'

const Terminal = ({
  initInput = '',
  promptSymbol = '↝',
  terminalId = 'terminal01',
  theme = defaultTheme
}: TerminalProps) => {
  const {
    terminalState,
    terminalDispatch,
    enterCommand,
    printInvalidCommandError,
    adjacentCommand,
    historyIndex,
    setHistoryIndex
  } = useTerminalHistory()
  const [commands, updateCommands] = React.useState(
    initCommands(terminalDispatch)
  )
  // todo: will need to wrap useCluiInput in a hook so that we re-run this call when
  // 'commands' changes
  const [inputState, updateInput] = useCluiInput({
    command: commands,
    value: initInput,
    index: initInput.length
  })
  const containerRef = React.useRef(null)

  // todo: fix this to actually keep prompt in view @ container bottom
  function scrollOutput() {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight
  }

  function _submitInput() {
    enterCommand(inputState.value)
    if (inputState.run) {
      inputState.run()
    } else {
      printInvalidCommandError(inputState.value)
    }
    updateInput({ value: '' })
    setHistoryIndex(0)
    scrollOutput()
  }

  function _onInputKeyDownEvent(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        updateInput({ value: adjacentCommand('next', historyIndex) })
        break
      case 'ArrowUp':
        e.preventDefault()
        updateInput({ value: adjacentCommand('previous', historyIndex) })
        break
      case 'Enter':
        e.preventDefault()
        if (
          inputState.options[0] &&
          inputState.options[0].value !== 'undefined'
        ) {
          updateInput({ value: inputState.options[0].value + ' ' })
        } else {
          _submitInput()
        }
        break
    }
  }

  // typescript is shitware and gets mad if you tell it that currentTarget
  // should be an HTMLInputElement
  function onInputChange(currentTarget: any): void {
    updateInput({
      value: currentTarget.value,
      index: currentTarget.selectionStart || 0
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <TerminalContainer className={'terminalContainer'} ref={containerRef}>
        <HistoryList
          terminalId={terminalId}
          promptSymbol={promptSymbol}
          history={terminalState.history}
        />
        <CommandInput
          promptSymbol={promptSymbol}
          value={inputState.value}
          onKeyDown={_onInputKeyDownEvent}
          onChange={e => onInputChange(e.currentTarget)}
          options={inputState.options}
          cursorPosition={inputState.nodeStart}
        />
      </TerminalContainer>
    </ThemeProvider>
  )
}

export interface TerminalProps {
  promptSymbol: string
  terminalId: string
  theme: Theme
  initInput: string
}

export default Terminal
