import { SyntheticEvent, useEffect, useState } from 'react';

import {
  Container,
  ContainerCard,
  ContainerTitle,
  Form,
  ContainerInput,
  ContainerButton
} from './styles'

import { useMonetary } from '../../../../contexts/Monetary';
import { CategoryDespesa, IModalDespesaProps } from './types';
import { DespesaInfo } from './types';
import api from '../../../../services/axios'
import Button from '../../../../components/Button';
import { useAuth } from '../../../../contexts/Auth';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import ToastNotification from '../../../../components/ToastNotification';

const ModalDespesa = (props: IModalDespesaProps) => {
  const { close, id, modeEdition } = props;

  const { adicionarDespesa, editarDespesa } = useMonetary()
  const { userLogged } = useAuth()

  const [registration, setRegistration] = useState<DespesaInfo>(new DespesaInfo());
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (custo !== '' && descricao !== '' && categoria !== '' && dataLancamento !== '' && dataRecebimento !== '') {
  //     setCompletedInputs(true);
  //   }
  // }, [custo, descricao, categoria, dataLancamento, dataRecebimento])

  const buscarInfoDespesa = async () => {
    try {
      const req = {
        id: id,
        email: 'gabriel@email.com'
      }
      const response = await api.post('/route/expense.php?operation=f', req);
      if(response) {
        setRegistration(response.data[0])
      }
    } catch {

    }
  }

  useEffect(() => {
    if (modeEdition && id) {
      buscarInfoDespesa()
    }
  }, [modeEdition])

  const addDespesa = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const req: DespesaInfo = {
        ...registration,
        email: 'gabriel@email.com'
      }
      
      const response = await api.post('/route/expense.php?operation=c', req);

      if(response.status) {
        adicionarDespesa({...registration, id: response.data.id});
        ToastNotification({
          id: `error-${id}`,
          content: 'Despesa adicionada com sucesso'
        })
        close();
      }
    } catch {

    }
    setLoading(false)
  }

  const editDespesa = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)

    if (id) {
      try {
        const req = {
          ...registration,
          id,
          email: 'gabriel@email.com'
        }
        
        const response = await api.post('/route/expense.php?operation=u', req);
  
        if(response.status) {
          editarDespesa(req);
          close();
        }
      } catch {
  
      }
    }
    
    setLoading(false)
  }

  const onEnterDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      if (modeEdition) editDespesa(event) 
      else addDespesa(event)
    }
  }

  return (
    <Container>
      <ContainerCard>
        <ContainerTitle>
          <span>{modeEdition ? 'Editar' : 'Adicionar'} Despesa</span>
        </ContainerTitle>
        <Form onSubmit={(e) => modeEdition ? editDespesa(e) : addDespesa(e)} onKeyPress={onEnterDown}>
          <ContainerInput>
            <Input
              label="Descrição: "
              name="description"
              type="text"
              value={registration.description}
              onChange={(e) => setRegistration({...registration, description: e.target.value})}
            />
          </ContainerInput>
          <ContainerInput>
            <Input
              label="Custo: "
              name="value"
              type="text"
              value={registration.value}
              onChange={(e) => setRegistration({...registration, value: Number(e.target.value)})}
            />
          </ContainerInput>
          <ContainerInput>
            <Select 
            label="Categoria"
            value={registration.category} 
            onChange={(e) => setRegistration({...registration, category: Number(e.target.value)})}
            >
              <option value={CategoryDespesa.Sobrevivência}>Sobrevivência</option>
              <option value={CategoryDespesa.Cultura}>Cultura</option>
              <option value={CategoryDespesa.ExtraImprevisto}>Extra/Imprevisto</option>
              <option value={CategoryDespesa.Opcionais}>Opcionais</option>
            </Select>
          </ContainerInput>
          <ContainerInput>
            <Input
              label="Data de Pagamento: "
              name="payment_date"
              type="date"
              value={registration.payment_date}
              onChange={(e) => setRegistration({...registration, payment_date: e.target.value})}
            />
          </ContainerInput>
          <ContainerInput>
            <Input
              label="Data de Vencimento: "
              name="due_date"
              type="date"
              value={registration.due_date}
              onChange={(e) => setRegistration({...registration, due_date: e.target.value})}
            />
          </ContainerInput>
          <ContainerButton>
            <Button loading={loading} text={modeEdition ? 'Editar' : 'Adicionar'}/>
          </ContainerButton>
        </Form>
        
      <Button onClick={close} text="Cancelar"/>
      </ContainerCard>
    </Container>
  )
}

export default ModalDespesa;
