import { Action } from './types'

export const initCommands = (dispatch: React.Dispatch<Action>) => ({
  commands: {
    echo: {
      description: 'ouputs the next word or quote',
      commands: (args: string) => ({
        [args]: {
          description: `prints ${args}`,
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
