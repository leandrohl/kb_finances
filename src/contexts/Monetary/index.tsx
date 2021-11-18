import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/axios";
import { MonetaryContextData, DespesaInfo, ReceitaInfo } from "./types";

export const MonetaryContext = createContext({} as MonetaryContextData)


export const MonetaryProvider: React.FC = ({ children }) => {
  const [receitas, setReceitas] = useState<ReceitaInfo[]>([]);
  const [despesas, setDespesas] = useState<DespesaInfo[]>([]);

  const adicionarReceitas = (receitasInfo: ReceitaInfo[]) => {
    setReceitas([...receitas, ...receitasInfo])
  }

  const adicionarDespesas = (despesasInfo: DespesaInfo[]) => {
    setDespesas([...despesas, ...despesasInfo])
  }

  const adicionarReceita = (receita: ReceitaInfo) => {
    setReceitas([...receitas, receita])
  }
  const adicionarDespesa = (despesa: DespesaInfo) => {
    setDespesas([...despesas, despesa])
  }

  return (
    <MonetaryContext.Provider value={{
      adicionarDespesa,
      adicionarReceita,
      adicionarReceitas,
      adicionarDespesas,
      receitas,
      despesas,
    }} >
      {children}
    </MonetaryContext.Provider>
  )
}

export const useMonetary = () => {
  const context = useContext(MonetaryContext);
  return context
}