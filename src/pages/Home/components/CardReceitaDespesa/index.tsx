import { useEffect, useState } from 'react';

import {
  Container,
  ContainerCard,
  ContainerTitle,
  ContainerBody,
  ContainerInput,
  ContainerButtons
} from './styles'

import { useMonetary } from '../../../../contexts/Monetary';

interface ICardReceitaDespesa {
  close: () => void
}

const CardReceitas = (props: ICardReceitaDespesa) => {
  const { close } = props;

  const { adicionarReceita } = useMonetary()

  const [custo, setCusto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [dataRecebimento, setDataRecebimento] = useState('');
  const [completedInputs, setCompletedInputs] = useState(false);

  useEffect(() => {
    if (custo !== '' && descricao !== '' && categoria !== '' && dataLancamento !== '' && dataRecebimento !== '') {
      setCompletedInputs(true);
    }
  }, [custo, descricao, categoria, dataLancamento, dataRecebimento])

  const adicionar = () => {
    const form = {
      descricao,
      custo,
      categoria,
      dataLancamento,
      dataRecebimento
    }
    adicionarReceita(form);
    close();
  }

  return (
    <Container>
      <ContainerCard>
        <ContainerTitle>
          <span>Adicionar Receita</span>
        </ContainerTitle>
        <ContainerBody>
          <ContainerInput>
            <span>Descrição: </span>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </ContainerInput>
          <ContainerInput>
            <span>Custo: </span>
            <input
              type="text"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
            />
          </ContainerInput>
          <ContainerInput>
            <span>Categoria: </span>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </ContainerInput>
          <ContainerInput>
            <span>Data de lançamento: </span>
            <input
              type="date"
              value={dataLancamento}
              onChange={(e) => setDataLancamento(e.target.value)}
            />
          </ContainerInput>
          <ContainerInput>
            <span>Data de recebimento: </span>
            <input
              type="date"
              value={dataRecebimento}
              onChange={(e) => setDataRecebimento(e.target.value)}
            />
          </ContainerInput>
          <ContainerButtons>
            <button onClick={close}>Cancelar</button>
            <button
              onClick={adicionar}
              disabled={completedInputs ? false : true} >
              Adicionar
            </button>
          </ContainerButtons>
        </ContainerBody>
      </ContainerCard>
    </Container>
  )
}

export default CardReceitas;