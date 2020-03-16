import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { Theme, TerminalModel, Action } from './types'
import defaultTheme from './themes/default'
import CommandInput from './input/CommandInput'
import HistoryList from './HistoryList'
import TerminalContainer from './TerminalContainer'
import useCluiInput from './useCluiInput'

const Terminal = ({
  inputStr = '',
  promptSymbol = '$',
  terminalId = 'terminal01',
  theme = defaultTheme
}: TerminalProps) => {
  const terminalReducer = (terminalState: TerminalModel, action: Action) => {
    switch (action.type) {
      case 'history':
        return {
          ...terminalState,
          history: [action.payload, ...terminalState.history]
        }

      default:
        break
    }
  }
  const initCommands = {
    commands: {
      echo: {
        description: 'Prints whatever you give it',
        commands: (args: string) => ({
          [args]: {
            description: `Prints ${args}`,
            run: () => {
              terminalDispatch({
                type: 'history',
                payload: { type: 'TEXT_OUTPUT', content: args }
              })
            }
          }
        })
      }
    }
  }
  const initialModel: TerminalModel = {
    commands: initCommands,
    history: [],
    theme: defaultTheme
  }
  const [terminalState, terminalDispatch] = React.useReducer(
    terminalReducer,
    initialModel
  )
  const [inputState, inputUpdate] = useCluiInput({
    command: terminalState.commands,
    value: inputStr,
    index: inputStr.length
  })
  const [historyIndex, setHistoryIndex] = React.useState(0)
  const containerRef = React.useRef(null)

  function scrollOutput() {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight
  }

  function _submitInput() {
    // todo - handle invalid command with error output
    terminalDispatch({
      type: 'history',
      payload: { type: 'SUBMITTED_COMMAND', content: inputState.value }
    })
    if (inputState.run) {
      inputState.run()
    } else {
      terminalDispatch({
        type: 'history',
        payload: {
          type: 'TEXT_ERROR_OUTPUT',
          content: `${inputState.value} is not a valid command`
        }
      })
    }
    inputUpdate({ value: '' })
  }
  type historyDirection = 'previous' | 'next'
  const adjacentCommand = (direction: historyDirection, index: number) => {
    // TODO
  }
  function _onInputKeyDownEvent(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        inputUpdate(adjacentCommand('previous', historyIndex))
        setHistoryIndex(historyIndex + 2)
        break

      case 'ArrowDown':
        e.preventDefault()
        if (historyIndex > 0) {
          inputUpdate(adjacentCommand('next', historyIndex))
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
    inputUpdate({
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
