/* eslint-disable camelcase */

export interface IModalDespesaProps {
  close: () => void;
  id?: number;
  modeEdition: boolean;
}

export class DespesaInfo {
  category = 0;
  description = '';
  due_date = '';
  payment_date = '';
  value = 0;
  email = '';
}
