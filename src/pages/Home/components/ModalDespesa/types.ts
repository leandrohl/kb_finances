
export interface IModalDespesaProps {
  close: () => void;
  id?: number;
  modeEdition: boolean;
}

export enum CategoryDespesa {
  Sobrevivência = 0,
  Cultura = 1,
  ExtraImprevisto = 2,
  Opcionais = 3
}

export class DespesaInfo {
  category = 0;
  description = "";
  due_date = "";
  payment_date = '';
  value = 0;
  email = '';
}