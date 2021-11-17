import React, { useEffect, useState } from 'react';
import * as S from './styles';

import { useMonetary } from '../../contexts/Monetary';
import Header from './components/Header';
import CardReceitaDespesa from './components/CardReceitaDespesa'
import CardReceitas from './components/CardReceitaDespesa';
import api from '../../services/axios';

export class Movimentacao {
  category = "";
  description = "";
  entry_date = "";
  receipt_date = null
  value = "";
}

const Home: React.FC = () => {
  // const { despesas, receitas } = useMonetary();

  const [openAdicionarReceita, setOpenAdicionarReceita] = useState(false);
  const [openAdicionarDespesa, setOpenAdicionarDespesa] = useState(false);

  const [receitas, setReceitas] = useState<Movimentacao[]>([]);
  const [despesas, setDespesas] = useState<Movimentacao[]>([]);

  const buscarDespesas = async () => {
    try {
      const response = await api.get('/route/expense.php?operation=r');
      if(response) {
        setDespesas(response.data)
      }
    } catch {

    }
  }

  const buscarReceitas = async () => {
    try {
      const response = await api.get('/route/income.php?operation=r');
      if(response) {
        setReceitas(response.data)
      }
    } catch {

    }
  }

  useEffect(() => {
    buscarReceitas()
    buscarDespesas()
  }, [])

  const closeAdicionarReceita = () => {
    setOpenAdicionarReceita(false);
  };

  const closeAdicionarDespesa = () => {
    setOpenAdicionarDespesa(false);
  };

  const renderModalAdicionarReceita = () => (
    <CardReceitaDespesa close={closeAdicionarReceita} />
  );

  const renderModalAdicionarDespesa = () => (
    <CardReceitaDespesa close={closeAdicionarDespesa} />
  );

  const renderDespesas = () => (
    despesas.map((despesa, index) => (
      <S.Despesa key={index}>
        <span>{despesa.category}</span>
        <span>{despesa.description}</span>
        <span>R$ {despesa.value}</span>
      </S.Despesa>
    ))
  );

  const renderReceitas = () => (
    receitas.map((receita, index) => (
      <S.Receita key={index}>
        <span>{receita.category}</span>
        <span>{receita.description}</span>
        <span>R$ {receita.value}</span>
      </S.Receita>
    ))
  );

  return (
    <S.Container>
      <Header />
      <S.BodyContainer>
        <S.ButtonsAdd >
          <S.Button color="#73E07E" onClick={() => setOpenAdicionarReceita(true)}>
            Adicionar Receita
          </S.Button>
          <S.Button color="#D86161" onClick={() => setOpenAdicionarDespesa(true)}>
            Adicionar Despesa
          </S.Button>
        </S.ButtonsAdd>
        <S.Movimentacoes>
          <S.CardMovimentacao>
            <h3>Receitas</h3>
            {renderReceitas()}
          </S.CardMovimentacao>
          <S.CardMovimentacao>
            <h3>Despesas</h3>
            {renderDespesas()}
          </S.CardMovimentacao>
        </S.Movimentacoes>
        {/* <CardHorizontal>
          <h3>Despesas por categoria</h3>
          <DespesasPorCategoria />
        </CardHorizontal>
        <CardHorizontal>
          <h3>Economia mensal</h3>
          <EconomiaMensal />
        </CardHorizontal>
        <CardHorizontal>
          <h3>Gastos totais</h3>
          <GastosTotais />
        </CardHorizontal>
        <CardHorizontal>
          <h3>Como melhoria minha economia</h3>
          <MelhorarEconomia />
        </CardHorizontal> */}
      </S.BodyContainer>
      {openAdicionarReceita && renderModalAdicionarReceita()}
      {openAdicionarDespesa && renderModalAdicionarDespesa()}
    </S.Container>
  );
};

export default Home;
