import { TerminalModel, Action } from './types'
import { defaultTheme } from './themes'
import * as React from 'react'

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
const initialModel: any = {
  history: [],
  theme: defaultTheme
}
export default () => {
  const [terminalState, terminalDispatch] = React.useReducer(
    terminalReducer,
    initialModel
  )
  const enterCommand = (commandStr: string) =>
    terminalDispatch({
      type: 'history',
      payload: { type: 'SUBMITTED_COMMAND', content: commandStr }
    })
  const printInvalidCommandError = (commandStr: string) =>
    terminalDispatch({
      type: 'history',
      payload: {
        type: 'TEXT_ERROR_OUTPUT',
        content: `${commandStr} is not a valid command`
      }
    })

  const [historyIndex, setHistoryIndex] = React.useState(0)
  type historyDirection = 'previous' | 'next'
  const adjacentCommand = (direction: historyDirection, index: number) => {
    switch (direction) {
      case 'next':
        for (let i = Math.max(index - 1, 0); i >= 0; i--) {
          if (terminalState.history[i].type === 'SUBMITTED_COMMAND') {
            setHistoryIndex(i)
            return terminalState.history[i].content
          }
        }
        setHistoryIndex(0)
        return ''
      case 'previous':
        for (let i = index + 1; i < terminalState.history.length; i++) {
          if (terminalState.history[i].type === 'SUBMITTED_COMMAND') {
            setHistoryIndex(i)
            return terminalState.history[i].content
          }
        }
        break
    }
  }
  return {
    terminalState,
    terminalDispatch,
    printInvalidCommandError,
    enterCommand,
    adjacentCommand,
    historyIndex,
    setHistoryIndex
  }
}
