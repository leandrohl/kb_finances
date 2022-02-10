import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'

import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import ToastNotification from '../../../../components/ToastNotification'
import { useAuth } from '../../../../contexts/Auth'
import { useMonetary } from '../../../../contexts/Monetary'
import api from '../../../../services/axios'
import * as S from './styles'

const EconomiaMensal: React.FC = () => {
  const { userLogged: { user }, updateEconomy } = useAuth()
  const { receitaInfo, despesaInfo } = useMonetary()
  const [registro, setRegistro] = useState(0)

  const [economizarPorcentagem, setEconomizarPorcentagem] = useState(0)

  const gastoPercent = (despesaInfo * 100) / receitaInfo
  const economizarValor = receitaInfo - (receitaInfo * economizarPorcentagem) / 100

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
      const response = await api.post('/route/kakeibo.php?operation=get_economy', req)

      if (response) {
        setEconomizarPorcentagem(response.data)
        updateEconomy(response.data)
      }
    } catch {

    }
  }

  const salvarEconomiaPrevista = async () => {
    try {
      const req = {
        economy: registro,
        email: user.email,
        month: 2,
        year: 2022
      }
      const response = await api.post('/route/kakeibo.php?operation=set_economy', req)

      if (response) {
        setEconomizarPorcentagem(registro)
        updateEconomy(registro)
        ToastNotification({
          id: 'error',
          content: 'Economia mensal atualizada com sucesso'
        })
      }
    } catch {

    }
  }

  return (
    <div>
      <S.Grafico economizar={economizarPorcentagem}>
        <span>R$ {economizarValor}</span>
        <S.Gastos gasto={gastoPercent} economizar={economizarPorcentagem} >
          R$ { despesaInfo.toFixed(2) }
        </S.Gastos>
      </S.Grafico>
      <S.Container>
        <Input
          label="Quanto você deseja economizar (em porcentagem) ? "
          name="economizar"
          value={registro}
          onChange={(e) => {
            const value = Number(e.target.value)
            if (value >= 0 && value <= 100) {
              setRegistro(value)
            }
          } }
          percent
          min={0}
          max={100}
        />
        <Button
          text="Salvar"
          onClick={salvarEconomiaPrevista}
        />
      </S.Container>

    </div>
  )
}

export default EconomiaMensal
