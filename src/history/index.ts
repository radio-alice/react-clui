import TextOutput from './TextOutput'
import TextErrorOutput from './TextErrorOutput'
import CommandOutput from './Command'
import { HistoryTypes, HistoryComponent } from '../types'

export default {
  TEXT_OUTPUT: TextOutput,
  TEXT_ERROR_OUTPUT: TextErrorOutput,
  SUBMITTED_COMMAND: CommandOutput
} as Record<HistoryTypes, HistoryComponent>
