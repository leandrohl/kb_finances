import React, { createContext, useContext, useEffect, useState } from 'react'

import { MonetaryContextData, DespesaInfo, ReceitaInfo } from './types'

export const MonetaryContext = createContext({} as MonetaryContextData)

export const MonetaryProvider: React.FC = ({ children }) => {
  const [receitas, setReceitas] = useState<ReceitaInfo[]>([])
  const [despesas, setDespesas] = useState<DespesaInfo[]>([])
  const [receitaInfo, setReceitaInfo] = useState(0)
  const [despesaInfo, setDespesaInfo] = useState(0)

  useEffect(() => {
    setReceitas([])
    setDespesas([])
  }, [])

  const adicionarReceitas = (receitasInfo: ReceitaInfo[]) => {
    setReceitas([...receitas, ...receitasInfo])

    const values = receitasInfo.map(receita => Number(receita.value))

    setReceitaInfo(receitaInfo + values.reduce((t, n) => n + t, 0))
  }

  const adicionarDespesas = (despesasInfo: DespesaInfo[]) => {
    setDespesas([...despesas, ...despesasInfo])
    const values = despesasInfo.map(despesa => Number(despesa.value))

    setDespesaInfo(despesaInfo + values.reduce((t, n) => n + t, 0))
  }

  const adicionarReceita = (receita: ReceitaInfo) => {
    setReceitas([...receitas, receita])
    setReceitaInfo(receitaInfo + receita.value)
  }

  const editarReceita = (receitaEditada: ReceitaInfo) => {
    const receitasFilter = receitas.filter(receita => receita.id !== receitaEditada.id)
    setReceitas([receitaEditada, ...receitasFilter])
  }

  const editarDespesa = (despesaEditada: DespesaInfo) => {
    const despesasFilter = despesas.filter(despesa => despesa.id !== despesaEditada.id)
    setDespesas([despesaEditada, ...despesasFilter])
    // setReceitaInfo(receitaInfo + receita.value)
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

  const adicionarDespesa = (despesa: DespesaInfo) => {
    setDespesas([...despesas, despesa])
    setDespesaInfo(despesaInfo + despesa.value)
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
      excluirDespesa
    }} >
      {children}
    </MonetaryContext.Provider>
  )
}

export const useMonetary = () => {
  const context = useContext(MonetaryContext)
  return context
}
