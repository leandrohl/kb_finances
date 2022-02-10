import React, { useState, useEffect } from 'react'

import Button from '../../../../components/Button'
import ToastNotification from '../../../../components/ToastNotification'
import { useAuth } from '../../../../contexts/Auth'
import api from '../../../../services/axios'
import * as S from './styles'

const ComoMelhorarEconomia: React.FC = () => {
  const [registro, setRegistro] = useState('')

  const { userLogged: { user } } = useAuth()

  useEffect(() => {
    buscarEconomiaPrevista()
  }, [])

  const buscarEconomiaPrevista = async () => {
    try {
      const req = {
        email: user.email,
        month: 2,
        year: 2022
      }
      const response = await api.post('/route/kakeibo.php?operation=get_annotation', req)

      if (response) {
        setRegistro(response.data)
      }
    } catch {

    }
  }

  const salvarMelhorarEconomia = async () => {
    try {
      const req = {
        annotation: registro,
        email: user.email,
        month: 2,
        year: 2022
      }

      const response = await api.post('/route/kakeibo.php?operation=set_annotation', req)

      if (response) {
        // setEconomizarPorcentagem(registro)
        // updateEconomy(registro)
        ToastNotification({
          id: 'error',
          content: 'Economia mensal atualizada com sucesso'
        })
      }
    } catch {

    }
  }

  return (
    <S.Container>
      <textarea
        value={registro}
        onChange={(e) => setRegistro(e.target.value)}
        rows={4}
        cols={50}

      />
      <Button
        text='Salvar'
        onClick={salvarMelhorarEconomia}
      />
    </S.Container>
  )
}

export default ComoMelhorarEconomia
