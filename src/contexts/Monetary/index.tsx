import React, { createContext, useContext, useEffect, useState } from 'react'

import { MonetaryContextData, DespesaInfo, ReceitaInfo, DataAtual } from './types'

export const MonetaryContext = createContext({} as MonetaryContextData)

export const MonetaryProvider: React.FC = ({ children }) => {
  const [receitas, setReceitas] = useState<ReceitaInfo[]>([])
  const [despesas, setDespesas] = useState<DespesaInfo[]>([])
  const [receitaInfo, setReceitaInfo] = useState(0)
  const [despesaInfo, setDespesaInfo] = useState(0)
  const [dataAtual, setDataAtual] = useState(new DataAtual())

  useEffect(() => {
    const data = new Date()
    setDataAtual({
      mes: data.getMonth(),
      ano: data.getFullYear()
    })
    setReceitaInfo(0)
    setDespesaInfo(0)
    setReceitas([])
    setDespesas([])
  }, [])

  const proximoMes = () => {
    if (dataAtual.mes === 11) {
      setDataAtual({
        mes: 0,
        ano: dataAtual.ano + 1
      })
    } else {
      setDataAtual({
        ...dataAtual,
        mes: dataAtual.mes + 1
      })
    }
  }

  const voltarMes = () => {
    if (dataAtual.mes === 0) {
      setDataAtual({
        mes: 11,
        ano: dataAtual.ano - 1
      })
    } else {
      setDataAtual({
        ...dataAtual,
        mes: dataAtual.mes - 1
      })
    }
  }

  const isMovimentacaoDataAtual = (data: string) => {
    const dataRecebida = new Date(data)
    if (dataRecebida.getMonth() === dataAtual.mes && dataRecebida.getFullYear() === dataAtual.ano) {
      return true
    } else return false
  }

  const adicionarReceitas = (receitasInfo: ReceitaInfo[]) => {
    setReceitas([...receitasInfo])

    const values = receitasInfo.map(receita => Number(receita.value))

    setReceitaInfo(values.reduce((t, n) => n + t, 0))
  }

  const adicionarDespesas = (despesasInfo: DespesaInfo[]) => {
    setDespesas([...despesasInfo])
    const values = despesasInfo.map(despesa => Number(despesa.value))

    setDespesaInfo(values.reduce((t, n) => n + t, 0))
  }

  const adicionarReceita = (receita: ReceitaInfo) => {
    if (isMovimentacaoDataAtual(receita.receipt_date)) {
      setReceitas([...receitas, receita])
      setReceitaInfo(receitaInfo + receita.value)
    }
  }

  const adicionarDespesa = (despesa: DespesaInfo) => {
    if (isMovimentacaoDataAtual(despesa.payment_date)) {
      setDespesas([...despesas, despesa])
      setDespesaInfo(despesaInfo + despesa.value)
    }
  }

  const editarReceita = (receitaEditada: ReceitaInfo) => {
    if (isMovimentacaoDataAtual(receitaEditada.receipt_date)) {
      const receitasFilter = receitas.filter(receita => receita.id !== receitaEditada.id)
      setReceitas([receitaEditada, ...receitasFilter])
    } else {
      excluirReceita(receitaEditada.id)
    }
  }

  const editarDespesa = (despesaEditada: DespesaInfo) => {
    if (isMovimentacaoDataAtual(despesaEditada.payment_date)) {
      const despesasFilter = despesas.filter(despesa => despesa.id !== despesaEditada.id)
      setDespesas([despesaEditada, ...despesasFilter])
    } else {
      excluirDespesa(despesaEditada.id)
    }
  }

  const excluirReceita = (id: number) => {
    const receita = receitas.find(receita => receita.id === id)
    if (receita) {
      const receitasFilter = receitas.filter(rec => rec.id !== receita.id)
      setReceitas(receitasFilter)
      setReceitaInfo(receitaInfo - receita.value)
    }
  }

  const excluirDespesa = (id: number) => {
    const despesasFilter = despesas.filter(despesa => despesa.id !== id)
    setDespesas(despesasFilter)

    const despesa = despesas.find(receita => receita.id === id)
    if (despesa) {
      const despesasilter = despesas.filter(des => des.id !== despesa.id)
      setDespesas(despesasilter)
      setDespesaInfo(despesaInfo - despesa.value)
    }
  }

  return (
    <MonetaryContext.Provider value={{
      adicionarDespesa,
      adicionarReceita,
      adicionarReceitas,
      adicionarDespesas,
      receitas,
      despesas,
      receitaInfo,
      despesaInfo,
      editarReceita,
      excluirReceita,
      editarDespesa,
      excluirDespesa,
      proximoMes,
      voltarMes,
      dataAtual
    }} >
      {children}
    </MonetaryContext.Provider>
  )
}

export const useMonetary = () => {
  const context = useContext(MonetaryContext)
  return context
}
