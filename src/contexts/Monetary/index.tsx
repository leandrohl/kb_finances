import { createContext, useContext, useState } from "react";
import { MonetaryContextData, Movimentacao } from "./types";

export const MonetaryContext = createContext({} as MonetaryContextData)


export const MonetaryProvider: React.FC = ({ children }) => {

  const [receitas, setReceitas] = useState<Movimentacao[]>([]);
  const [despesas, setDespesas] = useState<Movimentacao[]>([]);

  const adicionarReceita = (receita: Movimentacao) => {
    setReceitas([...receitas, receita])
  }
  const adicionarDespesa = (despesa: Movimentacao) => {
    setDespesas([...despesas, despesa])
  }

  return (
    <MonetaryContext.Provider value={{
      adicionarDespesa,
      adicionarReceita,
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