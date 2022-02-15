/* eslint-disable camelcase */
export interface MonetaryContextData {
  // eslint-disable-next-line no-unused-vars
  adicionarDespesa: (despesa: DespesaInfo) => void,
  adicionarReceita: (receita: ReceitaInfo) => void,
  adicionarDespesas: (despesaInfo: DespesaInfo[]) => void,
  adicionarReceitas: (receitaInfo: ReceitaInfo[]) => void,
  editarReceita: (receitaEditada: ReceitaInfo) => void,
  editarDespesa: (despesaEditada: DespesaInfo) => void,
  excluirReceita: (id: number) => void,
  excluirDespesa: (id: number) => void,
  receitas: ReceitaInfo[],
  despesas: DespesaInfo[],
  receitaInfo: number,
  despesaInfo: number
}

export class DespesaInfo {
  id = 0
  category = 0;
  description = '';
  due_date = '';
  payment_date = '';
  value = 0;
  email = '';
}

export class ReceitaInfo {
  id = 0
  description = ''
  value = 0
  category = 0
  email = ''
  receipt_date = ''
}
