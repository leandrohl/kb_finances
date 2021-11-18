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
import { ICardReceitaDespesa } from './types';
import { ReceitaInfo } from '../../../../contexts/Monetary/types';
import api from '../../../../services/axios'
import Button from '../../../../components/Button';
import { useAuth } from '../../../../contexts/Auth';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

const CardAddReceita = (props: ICardReceitaDespesa) => {
  const { close } = props;

  const { adicionarReceita } = useMonetary()
  const {userLogged} = useAuth()

  const [registration, setRegistration] = useState<ReceitaInfo>(new ReceitaInfo());
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (custo !== '' && descricao !== '' && categoria !== '' && dataLancamento !== '' && dataRecebimento !== '') {
  //     setCompletedInputs(true);
  //   }
  // }, [custo, descricao, categoria, dataLancamento, dataRecebimento])

  const addReceita = async (e: SyntheticEvent) => {
    console.log('hahahah')
    e.preventDefault();
    setLoading(true)

    console.log('cheguei aqui 1')

    try {
      console.log('cheguei aqui 2')
      const req: ReceitaInfo = {
        ...registration,
        email: 'gabriel@email.com'
      }
      
      const response = await api.post('/route/income.php?operation=c', req);

      if(response.status) {
        adicionarReceita(registration);
        close();
      }
    } catch {

      console.log('cheguei aqui 4')
    }
    console.log('cheguei aqui 3')
    setLoading(false)
  }

  const onEnterDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      addReceita(event)
    }
  }

  return (
    <Container>
      <ContainerCard>
        <ContainerTitle>
          <span>Adicionar Receita</span>
        </ContainerTitle>
        <Form onSubmit={(e) => addReceita(e)} onKeyPress={onEnterDown}>
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
              <option value={0}>Salário</option>
              <option value={1}>Presente</option>
              <option value={2}>Investimento</option>
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
            <Button loading={loading} text="Adicionar"/>
          </ContainerButton>
        </Form>
        
      <Button onClick={close} text="Cancelar"/>
      </ContainerCard>
    </Container>
  )
}

export default CardAddReceita;