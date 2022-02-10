import React, { useEffect, useState } from 'react'

import { MdModeEdit, MdDelete } from 'react-icons/md'
import ToastNotification from '../../components/ToastNotification'
import EconomiaMensal from './components/EconomiaMensal'
import { useAuth } from '../../contexts/Auth'
import { useMonetary } from '../../contexts/Monetary'
import { DespesaInfo, ReceitaInfo } from '../../contexts/Monetary/types'
import api from '../../services/axios'
import ModalReceita from '././components/ModalReceita'
import ComoMelhorarEconomia from './components/ComoMelhorarEconomia'
import DespesaCategoria from './components/DespesaCategoria'
import Header from './components/Header'
import ModalDespesa from './components/ModalDespesa'
import { CategoryDespesa } from './components/ModalDespesa/types'
import { CategoryReceita } from './components/ModalReceita/types'
import * as S from './styles'

const Home: React.FC = () => {
  const { userLogged: { user } } = useAuth()
  const { despesas, receitas, adicionarReceitas, adicionarDespesas, excluirReceita, excluirDespesa } = useMonetary()

  const [openModalReceita, setOpenModalReceita] = useState(false)
  const [openModalDespesa, setOpenModalDespesa] = useState(false)

  const [modeEdicao, setModoEdicao] = useState(false)
  const [movimentacaoSelectId, setMovimentacaoSelectId] = useState(-1)

  const buscarDespesas = async () => {
    try {
      const req = {
        email: user.email
      }
      const response = await api.post('/route/expense.php?operation=r', req)
      if (response) {
        adicionarDespesas(response.data)
      }
    } catch {

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
    } catch {

    }
  }

  useEffect(() => {
    buscarReceitas()
    buscarDespesas()
  }, [])

  const removerReceita = async (receita: ReceitaInfo) => {
    try {
      const { id } = receita

      const response = await api.post('/route/income.php?operation=d', { id })

      if (response.status) {
        excluirReceita(id)
        ToastNotification({
          id: `error-${id}`,
          content: 'Receita removida com sucesso'
        })
      }
    } catch {

    }
  }

  const removerDespesa = async (despesa: DespesaInfo) => {
    try {
      const { id } = despesa

      const response = await api.post('/route/expense.php?operation=d', { id })

      if (response.status) {
        excluirDespesa(id)
        ToastNotification({
          id: `error-${id}`,
          content: 'Despesa removida com sucesso'
        })
      }
    } catch {

    }
  }

  const closeModalReceita = () => {
    setOpenModalReceita(false)
  }

  const closeModalDespesa = () => {
    setOpenModalDespesa(false)
  }

  const renderDespesas = () => (
    despesas.map((despesa, index) => (
      <S.ContainerMovimentacao key={index}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
          <span>{despesa.description}</span>
          <S.Category color="#D86161">{CategoryDespesa[despesa.category]}</S.Category>
        </div>
        <span>R$ {Number(despesa.value).toFixed(2)}</span>
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          <MdModeEdit
            size={20}
            onClick={() => {
              setModoEdicao(true)
              setMovimentacaoSelectId(despesa.id)
              setOpenModalDespesa(true)
            }} />
          <MdDelete size={20} onClick={() => removerDespesa(despesa)}/>
        </div>
      </S.ContainerMovimentacao>
    ))
  )

  const renderReceitas = () => (
    receitas.map((receita, index) => (
      <S.ContainerMovimentacao key={index}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
          <span>{receita.description}</span>
          <S.Category color="#73E07E">{CategoryReceita[receita.category]}</S.Category>
        </div>
        <span>R$ {Number(receita.value).toFixed(2)}</span>
        <div style={{ display: 'flex', cursor: 'pointer' }}>
          <MdModeEdit
            size={20}
            onClick={() => {
              setModoEdicao(true)
              setMovimentacaoSelectId(receita.id)
              setOpenModalReceita(true)
            }}
          />
          <MdDelete size={20} onClick={() => removerReceita(receita)}/>
        </div>
      </S.ContainerMovimentacao>
    ))
  )

  return (
    <S.Container>
      <Header />
      <S.BodyContainer>
        <S.ButtonsAdd >
          <S.Button color="#73E07E" onClick={() => {
            setModoEdicao(false)
            setOpenModalReceita(true)
          }}
          >
            Adicionar Receita
          </S.Button>
          <S.Button color="#D86161"onClick={() => {
            setModoEdicao(false)
            setOpenModalDespesa(true)
          }}>
            Adicionar Despesa
          </S.Button>
        </S.ButtonsAdd>
        <S.Movimentacoes>
          <S.CardMovimentacao>
            <h3>Receitas</h3>
            {renderReceitas()}
          </S.CardMovimentacao>
          <S.CardMovimentacao>
            <h3>Despesas</h3>
            {renderDespesas()}
          </S.CardMovimentacao>
        </S.Movimentacoes>
        <S.CardHorizontal>
          <h3>Despesas por categoria</h3>
          <DespesaCategoria />
        </S.CardHorizontal>
        <S.CardHorizontal>
          <h3>Economia mensal</h3>
          <EconomiaMensal />
        </S.CardHorizontal>
        <S.CardHorizontal>
          <h3>Gastos totais</h3>
          {/* <GastosTotais /> */}
        </S.CardHorizontal>
        <S.CardHorizontal>
          <h3>Como melhoria minha economia</h3>
          <ComoMelhorarEconomia />
        </S.CardHorizontal>
      </S.BodyContainer>
      {openModalReceita && <ModalReceita close={closeModalReceita} id={movimentacaoSelectId} modeEdition={modeEdicao}/>}
      {openModalDespesa && <ModalDespesa close={closeModalDespesa} id={movimentacaoSelectId} modeEdition={modeEdicao} />}
    </S.Container>
  )
}

export default Home
