import React, { SyntheticEvent, useEffect, useState } from 'react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Registrations, RegistrationsErrors } from './types';
import * as S from './styles';
import api from '../../services/axios';
import { useAuth } from '../../contexts/Auth';
import { Redirect } from 'react-router-dom';

const Login: React.FC = () => {
  const [registration, setRegistration] = useState<Registrations>(new Registrations());
  const [registrationError, setRegistrationError] = useState<RegistrationsErrors>(new RegistrationsErrors());
  const [loading, setLoading] = useState(false);
  const { signIn, userLogged } = useAuth()

  useEffect(() => {
    console.log(registrationError)
  }, [registrationError])

  const validateRequiredFields = (requiredFields: object) => {
    const fieldsArr = Object.keys(requiredFields);
    let errors = {...registrationError}

    fieldsArr.forEach((field) => {
      console.log(field)
      if (!requiredFields) {
        setRegistrationError({
          ...errors,
          [field]: 'Esse campo é de preenchimento obrigatório',
        })
    }});
    // setRegistrationError(errors)
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!registration.email || !registration.password) validateRequiredFields(registrationError)
    else {
      try {
        const response = await api.post('/route/login.php', registration);

        if (response.status) {
          signIn({
            user: {
              email: registration.email,
              password: registration.password,
              balance: response.data.balance
            },
            signed: true
          });
        }
      } catch (e: any) {
        console.log(e.message)
        if (e.property === 'email') {
          setRegistrationError({ ...registrationError, email: e.message })
        } else if (e.property === 'password') {
          setRegistrationError({ ...registrationError, password: e.message })
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const onEnterDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }

  const isLogged = !!userLogged.signed

  return (
    <>
      {isLogged && <Redirect to="/" />}
      <S.Container>
        <S.Form onSubmit={(e) => handleSubmit(e)} onKeyPress={onEnterDown}>
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
            value={registration.email}
            onChange={(e) => setRegistration({ ...registration, email: e.target.value })}
            error={!!registrationError.email}
            labelError={registrationError.email}
            required
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            value={registration.password}
            onChange={(e) => setRegistration({ ...registration, password: e.target.value })}
            error={!!registrationError.password}
            labelError={registrationError.password}
            required
          />
          <Button
            text="Entrar"
            loading={loading}
          />
        </S.Form>
      </S.Container>
    </>
  );
};

export default Login;
