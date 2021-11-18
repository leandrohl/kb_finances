export interface MonetaryContextData {
  // eslint-disable-next-line no-unused-vars
  adicionarDespesa: (despesa: DespesaInfo) => void,
  adicionarReceita: (receita: ReceitaInfo) => void,
  adicionarDespesas: (despesaInfo: DespesaInfo[]) => void,
  adicionarReceitas: (receitaInfo: ReceitaInfo[]) => void,
  receitas: ReceitaInfo[],
  despesas: DespesaInfo[],
}

export class DespesaInfo {
  category = 0;
  description = "";
  due_date = "";
  payment_date = '';
  value = 0;
  email = '';
}

export class ReceitaInfo {
  description = ''
	value = 0
	category = 0
	email = ''
	receipt_date = ''
}