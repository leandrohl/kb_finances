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
import { DespesaInfo, ReceitaInfo } from '../../../../contexts/Monetary/types';
import api from '../../../../services/axios'
import Button from '../../../../components/Button';
import { useAuth } from '../../../../contexts/Auth';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

const CardAddDespesa = (props: ICardReceitaDespesa) => {
  const { close } = props;

  const { adicionarDespesa } = useMonetary()
  const {userLogged} = useAuth()

  const [registration, setRegistration] = useState<DespesaInfo>(new DespesaInfo());
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   if (custo !== '' && descricao !== '' && categoria !== '' && dataLancamento !== '' && dataRecebimento !== '') {
  //     setCompletedInputs(true);
  //   }
  // }, [custo, descricao, categoria, dataLancamento, dataRecebimento])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const req: DespesaInfo = {
        ...registration,
        email: 'gabriel@email.com'
      }
      
      const response = await api.post('/route/expense.php?operation=c', req);

      if(response.status) {
        adicionarDespesa(registration);
        close();
      }
    } catch {

    }
    setLoading(false)
  }

  const onEnterDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }

  return (
    <Container>
      <ContainerCard>
        <ContainerTitle>
          <span>Adicionar Despesa</span>
        </ContainerTitle>
        <Form onSubmit={(e) => handleSubmit(e)} onKeyPress={onEnterDown}>
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
              <option value={0}>Sobrevivência</option>
              <option value={1}>Cultura</option>
              <option value={2}>Extra/Imprevisto</option>
              <option value={3}>Opcionais</option>
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
            <Button loading={loading} text="Adicionar"/>
          </ContainerButton>
        </Form>
        
      <Button onClick={close} text="Cancelar"/>
      </ContainerCard>
    </Container>
  )
}

export default CardAddDespesa;