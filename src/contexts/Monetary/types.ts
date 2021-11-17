export interface MonetaryContextData {
  // eslint-disable-next-line no-unused-vars
  adicionarDespesa: (receita: any) => void,
  adicionarReceita: (despesa: any) => void,
  receitas: Movimentacao[],
  despesas: Movimentacao[],
}

export class Movimentacao {
  descricao = ''
  categoria = ''
  custo = ''
}