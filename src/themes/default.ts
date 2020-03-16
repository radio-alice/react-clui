import { Theme } from '../types'

const defaultColors = {
  background: '#141313',
  promptSymbolColor: '#6effe6',
  commandColor: '#fcfcfc',
  outputColor: '#fcfcfc',
  errorOutputColor: '#ff89bd'
}

export default <Theme>{
  ...defaultColors,
  fontSize: '1.1rem',
  spacing: '1%',
  fontFamily: 'monospace',
  height: '50vh',
  width: '100%'
}
