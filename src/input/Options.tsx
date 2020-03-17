import * as React from 'react'

export default ({ options }) => {
  return (
    <ul>
      {options.map(option => (
        <li key={option.value}>
          {option.value}: {option.data.description}
        </li>
      ))}
    </ul>
  )
}
