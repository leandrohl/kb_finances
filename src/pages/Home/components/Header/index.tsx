import React from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useAuth } from '../../../../contexts/Auth';
import { useMonetary } from '../../../../contexts/Monetary';
// import { FaPiggyBank } from 'react-icons/fa';
import * as S from './styles';

const Header: React.FC = () => {
  const {signOut, userLogged} = useAuth()
  const { movimentacaoInfo, receitaInfo, despesaInfo } = useMonetary()


  return(
  <S.Container>
    <S.ContainerMenu>
      <div></div>
      <S.Data>
        <IoIosArrowBack
          size={16}
        />
        novembro
        <IoIosArrowForward
          size={16}
        />
      </S.Data>
      <S.Logout onClick={() => signOut()}>Logout</S.Logout>
    </S.ContainerMenu> 
    <S.ContainerInfos>
      <S.Info>
        <span>Receitas</span>
        <h2>R$ {receitaInfo.toFixed(2)}</h2>
        <S.Icon color="#66D07E" />
      </S.Info>
      <S.Info>
        <span>Saldo</span>
        <h2>R$ {(receitaInfo - despesaInfo).toFixed(2)}</h2>
        <S.Icon color="#66CAD0">
          {/* <FaPiggyBank
            size={16}
          /> */}
        </S.Icon>
      </S.Info>
      <S.Info>
        <span>Despesas</span>
        <h2>R$ {despesaInfo.toFixed(2)}</h2>
        <S.Icon color="#DD3A3A" />
      </S.Info>
    </S.ContainerInfos>
  </S.Container>
)};

export default Header;
