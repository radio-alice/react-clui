import { useReducer, useCallback, useRef } from 'react'
import createInput, { ICommand } from '@replit/clui-input'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        ...action.updates
      }
    default:
      return state
  }
}

interface Options {
  command?: ICommand
  value?: string
  index?: number
}
const useCluiInput = (options: Options) => {
  const input = useRef(null)

  const [state, dispatch] = useReducer(reducer, {
    value: options.value || '',
    index: options.index || 0,
    options: [],
    loading: false,
    commands: [],
    exhausted: false
  })

  if (!input.current) {
    input.current = createInput({
      command: options.command,
      value: options.value,
      index: options.index,
      onUpdate: updates => {
        dispatch({ type: 'UPDATE', updates: { loading: false, ...updates } })
      }
    })
  }

  const update = useCallback(
    updates => {
      if (input.current) {
        const different = filterUnchanged(updates, state)
        if (!Object.keys(different).length) return
        input.current(different)
        dispatch({ type: 'UPDATE', updates: { loading: true, ...different } })
      }
    },
    [dispatch, state.value, state.index]
  )

  return [state, update]
}

interface Update {
  index: number
  value: any
}
const filterUnchanged = (updates: Update, state: Update) => {
  const different = {
    value:
      updates.value !== undefined && updates.value !== state.value
        ? updates.value
        : null,
    index:
      updates.index !== undefined && updates.index !== state.index
        ? updates.index
        : null
  }
  return Object.fromEntries(
    Object.entries(different).filter(([k, v]) => v !== null)
  )
}

export default useCluiInput
