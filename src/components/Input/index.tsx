import React, { InputHTMLAttributes, useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as S from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string
}

const Input: React.FC<IInputProps> = (props: IInputProps) => {
  const {
    name, label, value, onChange, type,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const renderTypePassword = showPassword ? 'text' : 'password';

  const renderPasswordIcon = !showPassword
    ? <AiOutlineEye onClick={() => setShowPassword(true)} />
    : <AiOutlineEyeInvisible onClick={() => setShowPassword(false)} />;

  return (
    <S.Container>
      <label htmlFor={name}>
        {' '}
        {label}
        {' '}
      </label>
      <S.ContainerInput>
        <S.Input
          id={name}
          value={value}
          onChange={onChange}
          type={type === 'password' ? (renderTypePassword) : 'text'}
        />
        {type === 'password' && (renderPasswordIcon)}
      </S.ContainerInput>
    </S.Container>
  );
};

export default Input;
