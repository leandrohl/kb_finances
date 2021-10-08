import React, { useEffect, useState } from 'react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import Button from '../../components/Button';
import Input from '../../components/Input';

import * as S from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <S.Container>
      <S.Form>
        <S.Logo>
          <RiMoneyDollarBoxLine
            color="#835DAA"
            size={28}
          />
          <span>KB Finances</span>
        </S.Logo>
        <Input
          label="E-mail"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Senha"
          name="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Entrar"
          loading={loading}
        />
      </S.Form>
    </S.Container>
  );
};

export default Login;
