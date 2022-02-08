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
import { CategoryReceita, IModalReceitaProps } from './types';
import { ReceitaInfo } from './types';
import api from '../../../../services/axios'
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import ToastNotification from '../../../../components/ToastNotification';

const ModalReceita = (props: IModalReceitaProps) => {
  const { close, modeEdition, id } = props;

  const { adicionarReceita, editarReceita } = useMonetary()

  const [registration, setRegistration] = useState<ReceitaInfo>(new ReceitaInfo());
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (custo !== '' && descricao !== '' && categoria !== '' && dataLancamento !== '' && dataRecebimento !== '') {
  //     setCompletedInputs(true);
  //   }
  // }, [custo, descricao, categoria, dataLancamento, dataRecebimento])

  const buscarInfoReceita = async () => {
    try {
      const req = {
        id: id,
        email: 'gabriel@email.com'
      }
      const response = await api.post('/route/income.php?operation=f', req);
      if(response) {
        setRegistration(response.data[0])
      }
    } catch {

    }
  }

  useEffect(() => {
    if (modeEdition && id) {
      buscarInfoReceita()
    }
  }, [modeEdition])

  const addReceita = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const req = {
        ...registration,
        email: 'gabriel@email.com'
      }
      
      const response = await api.post('/route/income.php?operation=c', req);

      if(response.status) {
        adicionarReceita({...registration, id: response.data.id});
        ToastNotification({
          id: 'alert',
          content: 'Receita adicionada com sucesso'
        })
        close();
      }
    } catch {

    }
    setLoading(false)
  }

  const editReceita = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)

    if (id) {
      try {
        const req = {
          ...registration,
          id,
          email: 'gabriel@email.com'
        }
        
        const response = await api.post('/route/income.php?operation=u', req);
  
        if(response.status) {
          editarReceita(req);
          close();
        }
      } catch {
  
      }
    }
    
    setLoading(false)
  }

  const onEnterDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      if (modeEdition) editReceita(event) 
      else addReceita(event)
    }
  }

  return (
    <Container>
      <ContainerCard>
        <ContainerTitle>
          <span>{modeEdition ? 'Editar' : 'Adicionar'} Receita</span>
        </ContainerTitle>
        <Form onSubmit={(e) => modeEdition ? editReceita(e) : addReceita(e)} onKeyPress={onEnterDown}>
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
              <option value={CategoryReceita.Salario}>Salário</option>
              <option value={CategoryReceita.Presente}>Presente</option>
              <option value={CategoryReceita.Investimento}>Investimento</option>
            </Select>
          </ContainerInput>
          <ContainerInput>
            <Input
              label="Data de Recebimento: "
              name="receipt_date"
              type="date"
              value={registration.receipt_date}
              onChange={(e) => setRegistration({...registration, receipt_date: e.target.value})}
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

export default ModalReceita;
