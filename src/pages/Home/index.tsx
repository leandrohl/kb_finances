import React, { useEffect, useState } from 'react'

import Loading from '../../components/Loading'
import ToastNotification from '../../components/ToastNotification'
import { useAuth } from '../../contexts/Auth'
import { useMonetary } from '../../contexts/Monetary'
import api from '../../services/axios'
import CardReceitasDespesas from './components/CardReceitasDespesas'
import ComoMelhorarEconomia from './components/ComoMelhorarEconomia'
import DespesaCategoria from './components/DespesaCategoria'
import EconomiaMensal from './components/EconomiaMensal'
import Header from './components/Header'
import * as S from './styles'

const Home: React.FC = () => {
  const { adicionarReceitas, adicionarDespesas, despesas } = useMonetary()
  const { userLogged: { user } } = useAuth()
  const [loading, setLoading] = useState(false)

  const buscarDespesas = async () => {
    setLoading(true)
    try {
      const req = {
        email: user.email
      }
      const response = await api.post('/route/expense.php?operation=r', req)
      if (response) {
        adicionarDespesas(response.data)
      }
    } catch (e: any) {
      ToastNotification({
        id: `error-${e.response}`,
        content: 'Não foi possível buscas as despesas'
      })
    }
  }

  const buscarReceitas = async () => {
    try {
      const req = {
        email: user.email
      }

      const response = await api.post('/route/income.php?operation=r', req)
      if (response) {
        adicionarReceitas(response.data)
      }
    } catch (e: any) {
      ToastNotification({
        id: `error-${e.response}`,
        content: 'Não foi possível buscas as receitas'
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    buscarReceitas()
    buscarDespesas()
  }, [])

  return (
    <S.Container>
      <Header />
      <CardReceitasDespesas />
      {
        despesas.length > 0 && (
          <S.Section>
            <DespesaCategoria />
          </S.Section>
        )
      }
      <S.Section>
        <EconomiaMensal />
      </S.Section>
      <S.Section>
        <ComoMelhorarEconomia />
      </S.Section>
    </S.Container>
  )
}

export default Home
