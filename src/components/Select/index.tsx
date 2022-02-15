import React, { SelectHTMLAttributes } from 'react'

import * as S from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  listItems: ListItem[];
  labelError?: string;
  error?: boolean;
}
export interface ListItem {
  key: number | string;
  value: string;
}

// eslint-disable-next-line arrow-body-style
const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    label,
    required,
    onChange,
    value,
    disabled,
    error,
    labelError,
    listItems
  } = props

  return (
    <S.Container>
      <S.Label>
        {label}
        {required && ' *'}
      </S.Label>
      <S.Select
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {listItems.map(item => {
          return (
            <option key={item.key} value={item.key} >{item.value}</option>
          )
        })}
      </S.Select>
      {error && (
        <span>
          {' '}
          { labelError }
          {' '}
        </span>
      )}
    </S.Container>
  )
}

export default Select
