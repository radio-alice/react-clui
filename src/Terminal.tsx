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
  inputStr = '',
  promptSymbol = '$',
  terminalId = 'terminal01',
  theme = defaultTheme
}: TerminalProps) => {
  const {
    terminalState,
    terminalDispatch,
    enterCommand,
    printInvalidCommandError
  } = useTerminalHistory()
  const [commands, updateCommands] = React.useState(
    initCommands(terminalDispatch)
  )
  // todo: will need to wrap useCluiInput in a hook so that we re-run this call when
  // 'commands' changes
  const [inputState, updateInput] = useCluiInput({
    command: commands,
    value: inputStr,
    index: inputStr.length
  })
  const [historyIndex, setHistoryIndex] = React.useState(0)
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
    scrollOutput()
  }

  type historyDirection = 'previous' | 'next'
  const adjacentCommand = (direction: historyDirection, index: number) => {
    // TODO
  }
  function _onInputKeyDownEvent(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        updateInput(adjacentCommand('previous', historyIndex))
        setHistoryIndex(historyIndex + 2)
        break

      case 'ArrowDown':
        e.preventDefault()
        if (historyIndex > 0) {
          updateInput(adjacentCommand('next', historyIndex))
          setHistoryIndex(historyIndex - 2)
        }
        break

      case 'Tab':
        e.preventDefault()
        // replace below with useCluiInput hook
        // const autoCompletedStr = emulator.autocomplete(emulatorState, inputStr)
        // setInput(autoCompletedStr)
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
          onSubmit={_submitInput}
          onKeyDown={_onInputKeyDownEvent}
          onChange={e => onInputChange(e.currentTarget)}
        />
      </TerminalContainer>
    </ThemeProvider>
  )
}

export interface TerminalProps {
  promptSymbol: string
  terminalId: string
  theme: Theme
  inputStr: string
}

export default Terminal
