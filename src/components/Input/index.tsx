/* eslint-disable react/require-default-props */
import React, { InputHTMLAttributes, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import * as S from './styles'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  error?: boolean,
  labelError?: string,
  percent?: boolean
}

const Input: React.FC<IInputProps> = (props: IInputProps) => {
  const {
    name, label, value, onChange, type, error, labelError, required, min, max, percent
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const renderTypePassword = showPassword ? 'text' : 'password'

  const renderPasswordIcon = !showPassword
    ? <AiOutlineEyeInvisible onClick={() => setShowPassword(true)} />
    : <AiOutlineEye onClick={() => setShowPassword(false)} />

  return (
    <S.Container error={error}>
      <label htmlFor={name}>
        {' '}
        {label}
        {' '}
        {required && '*'}
      </label>
      <S.ContainerInput>
        <S.Input
          id={name}
          value={value}
          onChange={onChange}
          type={type === 'password' ? (renderTypePassword) : type}
          required={required}
          min={min}
          max={max}
          error={error}
        />
        {type === 'password' && (renderPasswordIcon)}
        {percent && <span> % </span>}
      </S.ContainerInput>
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

export default Input
