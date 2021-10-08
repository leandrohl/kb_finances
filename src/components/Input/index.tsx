import React from 'react';

import * as S from './styles';

interface IInputProps {
  name: string,
  label: string
}

const Input: React.FC<IInputProps> = (props: IInputProps) => {
  const { name, label } = props;
  return (
    <S.Container>
      <label htmlFor={name}>
        {' '}
        {label}
        {' '}
      </label>
      <input id={name} />
    </S.Container>
  );
};

export default Input;
