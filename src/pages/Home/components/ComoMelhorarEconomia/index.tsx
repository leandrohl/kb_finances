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
  }, [user])

  const buscarEconomiaPrevista = async () => {
    try {
      const req = {
        email: user.email,
        month: 2,
        year: 2022
      }
      const response = await api.post('/route/kakeibo.php?operation=get_annotation', req)

      if (response.data) {
        setRegistro(response.data.anotacao || '')
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
      <h3>Como melhorar minha economia</h3>
      <textarea
        value={registro}
        onChange={(e) => setRegistro(e.target.value)}
        rows={6}
        cols={60}

      />
      <Button
        text='Salvar'
        onClick={salvarMelhorarEconomia}
      />
    </S.Container>
  )
}

export default ComoMelhorarEconomia
