import * as React from 'react'
import styled from 'styled-components'

export default ({ options, cursorPosition }: any) =>
  options.length ? (
    <OptionsList left={cursorPosition}>
      {options.map((option: any, index: number) =>
        option.value !== 'undefined' ? (
          <OptionItem key={option.value} highlighted={index === 0}>
            <OptionVal>{option.value}</OptionVal>:
            <OptionDescription> {option.data.description}</OptionDescription>
          </OptionItem>
        ) : null
      )}
    </OptionsList>
  ) : null

const OptionDescription = styled.span`
  font-family: sans-serif;
  margin: 0;
`

const OptionVal = styled.span`
  background-color: #18114e;
  padding: 0 0.25rem;
`

const OptionsList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  left: ${({ left }: ListProps) => left}ch;
  width: max-content;
`
const OptionItem = styled.div`
  padding: 0.25rem 0.5rem;
  background-color: ${({ highlighted }: ItemProps) =>
    highlighted ? '#807f7f' : '#515151'};
`

type ListProps = {
  left: number
}
type ItemProps = {
  highlighted: boolean
}
