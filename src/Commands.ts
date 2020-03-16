import { Action } from './types'

export const initCommands = (dispatch: React.Dispatch<Action>) => ({
  commands: {
    echo: {
      description: 'Prints whatever you give it',
      commands: (args: string) => ({
        [args]: {
          description: `Prints ${args}`,
          run: () => {
            dispatch({
              type: 'history',
              payload: { type: 'TEXT_OUTPUT', content: args }
            })
          }
        }
      })
    }
  }
})
