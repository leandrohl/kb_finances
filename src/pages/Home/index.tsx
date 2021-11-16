import React from 'react';
<<<<<<< HEAD
import * as S from './styles';

// import { MonetarioContext } from '../../context/index';
import Header from './components/Header';

const Home: React.FC = () => {
//   const context = useContext(MonetarioContext);
//   const { despesas, receitas } = context;

  const teste = 1;
  console.log(teste);

  //   const [openAdicionarReceita, setOpenAdicionarReceita] = useState(false);
  //   const [openAdicionarDespesa, setOpenAdicionarDespesa] = useState(false);

  //   const closeAdicionarReceita = () => {
  //     setOpenAdicionarReceita(false);
  //   };

  //   const closeAdicionarDespesa = () => {
  //     setOpenAdicionarDespesa(false);
  //   };

  //   const renderModalAdicionarReceita = () => (
  //     <CardReceitas close={closeAdicionarReceita} />
  //   );

  //   const renderModalAdicionarDespesa = () => (
  //     <CardDespesas close={closeAdicionarDespesa} />
  //   );

  //   const renderDespesas = () => (
  //     despesas.map((despesa, index) => (
  //       <Despesa key={index}>
  //         <span>{despesa.descricao}</span>
  //         <span>{despesa.categoria}</span>
  //         <span>{despesa.custo}</span>
  //       </Despesa>
  //     ))
  //   );

  //   const renderReceitas = () => (
  //     receitas.map((receita, index) => (
  //       <Receita key={index}>
  //         <span>{receita.descricao}</span>
  //         <span>{receita.categoria}</span>
  //         <span>{receita.custo}</span>
  //       </Receita>
  //     ))
  //   );

  return (
    <S.Container>
      <Header />
      {/* <BodyContainer>
        <ButtonsAdd colorReceita="#73E07E" colorDespesa="">
          <Button color="#73E07E" onClick={() => setOpenAdicionarReceita(true)}>
            Adicionar Receita
          </Button>
          <Button color="#D86161" onClick={() => setOpenAdicionarDespesa(true)}>
            Adicionar Despesa
          </Button>
        </ButtonsAdd>
        <Movimentacoes>
          <CardMovimentacao>
            <h3>Receitas</h3>
            {renderReceitas()}
          </CardMovimentacao>
          <CardMovimentacao>
            <h3>Despesas</h3>
            {renderDespesas()}
          </CardMovimentacao>
        </Movimentacoes>
        <CardHorizontal>
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
        </CardHorizontal>
      </BodyContainer> */}
      {/* {openAdicionarReceita && renderModalAdicionarReceita()}
      {openAdicionarDespesa && renderModalAdicionarDespesa()} */}
    </S.Container>
  );
};
=======

// import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <> dgsgfs </>
  );
}
>>>>>>> e3570c4d95c33a791e017088cbef329d8318b131

export default Home;
