import React, { SyntheticEvent, useEffect, useState } from 'react'
import { RiMoneyDollarBoxLine } from 'react-icons/ri'
import { Link, Redirect } from 'react-router-dom'

import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../contexts/Auth'
import { IUser } from '../../contexts/Auth/types'
import api from '../../services/axios'
import * as S from './styles'
import { LoginError, LoginInfo } from './types'

const Login: React.FC = () => {
  const [registration, setRegistration] = useState<LoginInfo>(new LoginInfo())
  const [loading, setLoading] = useState(false)
  const { signIn, userLogged } = useAuth()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setRegistration({ ...registration, error: new LoginError() })
    setLoading(true)

    try {
      const response = await api.post<IUser>('/route/login.php', registration)

      if (response.status) {
        const user = {
          ...response.data,
          email: registration.email,
          password: registration.password
        }
        signIn(user)
      }
    } catch (e: any) {
      const error = e.response.data
      const errors = { ...registration.error }
      if (error.property === 'email') {
        errors.email = error.message
      } else if (error.property === 'password') {
        errors.password = error.message
      }
      setRegistration({ ...registration, error: errors })
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

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
            <RiMoneyDollarBoxLine color="#835DAA" size={28} />
            <span>KB Finances</span>
          </S.Logo>
          <Input
            label="E-mail"
            name="email"
            type="email"
            value={registration.email}
            onChange={(e) =>
              setRegistration({ ...registration, email: e.target.value })
            }
            error={!!registration.error.email}
            labelError={registration.error.email}
            required
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            value={registration.password}
            onChange={(e) =>
              setRegistration({ ...registration, password: e.target.value })
            }
            error={!!registration.error.password}
            labelError={registration.error.password}
            required
          />
          <Button text="Entrar" loading={loading} />

          <S.CardFooter>
            Ou faça seu <Link to="/user_registration">Cadastro</Link>
          </S.CardFooter>
        </S.Form>
      </S.Container>
    </>
  )
}

export default Login
