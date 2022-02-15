import React, { useState } from 'react'
import { MdModeEdit, MdDelete } from 'react-icons/md'

import ToastNotification from '../../../../components/ToastNotification'
import { useMonetary } from '../../../../contexts/Monetary'
import { DespesaInfo, ReceitaInfo } from '../../../../contexts/Monetary/types'
import api from '../../../../services/axios'
import ModalDespesa from './ModalDespesa'
import ModalReceita from './ModalReceita'
import * as S from './styles'

const CardReceitas: React.FC = () => {
  const { despesas, receitas, excluirReceita, excluirDespesa } = useMonetary()

  const [openModalReceita, setOpenModalReceita] = useState(false)
  const [openModalDespesa, setOpenModalDespesa] = useState(false)

  const [modoEdicao, setModoEdicao] = useState(false)
  const [movimentacaoSelectId, setMovimentacaoSelectId] = useState<number>()

  const removerReceita = async (receita: ReceitaInfo) => {
    try {
      const { id } = receita

      const response = await api.post('/route/income.php?operation=d', { id })

      if (response.status) {
        excluirReceita(id)
        ToastNotification({
          id: `success-${id}`,
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
          id: `success-${id}`,
          content: 'Despesa removida com sucesso'
        })
      }
    } catch {

    }
  }

  const renderReceitas = () => (
    receitas.map((receita, index) => (
      <S.ContainerMovimentacao key={index}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
          <span>{receita.description}</span>
          <S.Category color="#73E07E">{receita.category}</S.Category>
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

  const renderDespesas = () => (
    despesas.map((despesa, index) => (
      <S.ContainerMovimentacao key={index}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
          <span>{despesa.description}</span>
          <S.Category color="#D86161">{despesa.category}</S.Category>
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

  return (
    <S.Container>
      <S.ButtonsAdd >
        <S.Button
          color="#73E07E"
          onClick={() => {
            setModoEdicao(false)
            setOpenModalReceita(true)
          }}
        >
            Adicionar Receita
        </S.Button>
        <S.Button
          color="#D86161"
          onClick={() => {
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
      {openModalReceita && <ModalReceita close={() => setOpenModalReceita(false)} modeEdition={modoEdicao} id={movimentacaoSelectId} />}
      {openModalDespesa && <ModalDespesa close={() => setOpenModalDespesa(false)} modeEdition={modoEdicao} id={movimentacaoSelectId} />}
    </S.Container>
  )
}

export default CardReceitas
