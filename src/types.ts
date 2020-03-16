export type HistoryComponent = (props: any) => JSX.Element
export type HistoryTypes =
  | 'TEXT_OUTPUT'
  | 'TEXT_ERROR_OUTPUT'
  | 'SUBMITTED_COMMAND'

export interface HistoryItem {
  type: HistoryTypes
  content: string
}
export interface TerminalModel {
  history: HistoryItem[]
  theme: Theme
}
export type ActionType = 'history'
export type Action = { type: ActionType; payload: HistoryItem }

export interface Theme {
  background: string
  promptSymbolColor: string
  commandColor: string
  outputColor: string
  errorOutputColor: string
  fontSize: string
  spacing: string
  fontFamily: string
  height: string
  width: string
}
