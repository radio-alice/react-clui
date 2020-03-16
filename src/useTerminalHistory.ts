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
  return {
    terminalState,
    terminalDispatch,
    printInvalidCommandError,
    enterCommand
  }
}
