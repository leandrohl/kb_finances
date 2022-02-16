import React, { useEffect } from 'react'

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
  const { adicionarReceitas, adicionarDespesas, despesas, dataAtual } = useMonetary()
  const { userLogged: { user } } = useAuth()

  const buscarDespesas = async () => {
    try {
      const req = {
        email: user.email,
        month: dataAtual.mes + 1,
        year: dataAtual.ano
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
        email: user.email,
        month: dataAtual.mes + 1,
        year: dataAtual.ano
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
  }

  useEffect(() => {
    if (user) {
      buscarReceitas()
      buscarDespesas()
    }
  }, [dataAtual])

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
