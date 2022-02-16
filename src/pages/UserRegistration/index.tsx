import React, { SyntheticEvent, useEffect, useState } from 'react'
import { RiMoneyDollarBoxLine } from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom'

import Button from '../../components/Button'
import Input from '../../components/Input'
import ToastNotification from '../../components/ToastNotification'
import api from '../../services/axios'
import * as S from './styles'
import { RegisterInfo, RegisterError } from './types'

const UserRegistration: React.FC = () => {
  const [registration, setRegistration] = useState<RegisterInfo>(new RegisterInfo())
  const [loading, setLoading] = useState(false)
  const { replace } = useHistory()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setRegistration({ ...registration, error: new RegisterError() })

    try {
      const req = {
        name: registration.name,
        email: registration.email,
        password: registration.password
      }
      const response = await api.post('/route/user.php?operation=c', req)

      if (response) {
        console.log(response)
        ToastNotification({
          id: 'success',
          content: `${req.name}, seu cadastro foi criado com sucesso!`
        })
        replace('/Login')
      }
    } catch (e: any) {
      if (e.response) {
        const error = e.response.data
        const errors = { ...registration.error }
        if (error.property === 'name') {
          errors.name = error.message
        } else if (error.property === 'email') {
          errors.email = error.message
        } else if (error.property === 'password') {
          errors.password = error.message
        }
        setRegistration({ ...registration, error: errors })
      } else {
        ToastNotification({
          id: 'error',
          content: 'Não foi possível realizar o seu cadastro'
        })
      }
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

  return (
    <S.Container>
      <S.Form onSubmit={(e) => handleSubmit(e)} onKeyPress={onEnterDown}>
        <S.Logo>
          <RiMoneyDollarBoxLine color="#835DAA" size={28} />
          <span>Cadastro de usuário</span>
        </S.Logo>
        <Input
          label="Nome"
          name="nome"
          type="text"
          value={registration.name}
          onChange={(e) =>
            setRegistration({ ...registration, name: e.target.value })
          }
          error={!!registration.error.name}
          labelError={registration.error.name}
          required
        />
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
        <Button text="Cadastrar" loading={loading} />
        <S.CardFooter>
          ou faça seu <Link to="/login">Login</Link>
        </S.CardFooter>
      </S.Form>
    </S.Container>
  )
}

export default UserRegistration
