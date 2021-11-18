import React, { SelectHTMLAttributes } from 'react';

import * as S from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  label: string;
}

// eslint-disable-next-line arrow-body-style
const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    children,
    label,
    required,
    onChange,
    value,
    disabled,
  } = props;

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
        {children}
      </S.Select>
    </S.Container>
  );
};

export default Select;
