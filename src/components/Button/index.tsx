import React, { ButtonHTMLAttributes } from 'react';

import { VscLoading } from 'react-icons/vsc';
import * as S from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  loading: boolean
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const {
    text, loading
  } = props;
  return (
    <S.Button
      disabled={loading}
    >
      {
        loading
          ? (
            <S.Loading>
              <VscLoading />
            </S.Loading>
          )
          : text
      }
    </S.Button>
  );
};

export default Button;
