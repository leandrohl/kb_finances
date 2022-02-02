import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/axios";
import { MonetaryContextData, DespesaInfo, ReceitaInfo, MovimentacaoInfo } from "./types";

export const MonetaryContext = createContext({} as MonetaryContextData)


export const MonetaryProvider: React.FC = ({ children }) => {
  const [receitas, setReceitas] = useState<ReceitaInfo[]>([]);
  const [despesas, setDespesas] = useState<DespesaInfo[]>([]);
  const [movimentacaoInfo, setMovimentacaoInfo] = useState<MovimentacaoInfo>(new MovimentacaoInfo())
  const [receitaInfo, setReceitaInfo] = useState(0)
  const [despesaInfo, setDespesaInfo] = useState(0)

  const adicionarReceitas = (receitasInfo: ReceitaInfo[]) => {
    setReceitas([...receitas, ...receitasInfo])
  
    const values = receitasInfo.map(receita => Number(receita.value))
    
    setReceitaInfo(movimentacaoInfo.receita + values.reduce((t, n) => n + t, 0))
  }

  const adicionarDespesas = (despesasInfo: DespesaInfo[]) => {
    setDespesas([...despesas, ...despesasInfo])
    console.log(despesasInfo)
    const values = despesasInfo.map(despesa => Number(despesa.value))
    
    setDespesaInfo(movimentacaoInfo.receita + values.reduce((t, n) => n + t, 0))
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
    const receitasFilter = receitas.filter(receita => receita.id !== id)
    setReceitas(receitasFilter)
    // setReceitaInfo(receitaInfo + receita.value)
  }

  const excluirDespesa = (id: number) => {
    const despesasFilter = despesas.filter(despesa => despesa.id !== id)
    setDespesas(despesasFilter)
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
      movimentacaoInfo,
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
  const context = useContext(MonetaryContext);
  return context
}