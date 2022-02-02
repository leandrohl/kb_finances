
export interface IModalReceitaProps {
  close: () => void;
  id?: number;
  modeEdition: boolean;
}


export enum CategoryReceita {
  Salario = 0,
  Presente = 1,
  Investimento = 2
}

export class ReceitaInfo {
  description = ''
	value = 0
	category = 0
	email = ''
	receipt_date = ''
}