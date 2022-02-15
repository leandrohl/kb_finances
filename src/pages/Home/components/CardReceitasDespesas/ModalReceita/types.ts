
export interface IModalReceitaProps {
  close: () => void;
  id?: number;
  modeEdition: boolean;
}

export class ReceitaError {
  description = ''
  value = ''
  category = ''
  email = ''
  // eslint-disable-next-line camelcase
  receipt_date = ''
}

export class ReceitaInfo {
  description = ''
  value = 0
  category = 0
  email = ''
  // eslint-disable-next-line camelcase
  receipt_date = ''
  error = new ReceitaError()
}
