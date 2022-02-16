import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { FaPiggyBank } from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import { useAuth } from '../../../../contexts/Auth'
import { useMonetary } from '../../../../contexts/Monetary'
import * as S from './styles'

const Header: React.FC = () => {
  const { signOut } = useAuth()
  const { receitaInfo, despesaInfo, dataAtual, proximoMes, voltarMes } = useMonetary()

  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
  return (
    <S.Container>
      <S.ContainerMenu>
        <div>
        </div>
        <S.Data>
          <IoIosArrowBack
            size={16}
            onClick={voltarMes}
            style={{ cursor: 'pointer' }}
          />
          {meses[dataAtual.mes]} / {dataAtual.ano}
          <IoIosArrowForward
            size={16}
            onClick={proximoMes}
            style={{ cursor: 'pointer' }}
          />
        </S.Data>
        <S.Logout onClick={() => signOut()}>Logout</S.Logout>
      </S.ContainerMenu>
      <S.ContainerInfos>
        <S.Info>
          <span>Receitas</span>
          <h2>R$ {receitaInfo.toFixed(2)}</h2>
          <S.Icon color="#66D07E">
            <AiOutlinePlus
              size={24}
            />
          </S.Icon>
        </S.Info>
        <S.Info>
          <span>Saldo</span>
          <h2>R$ {(receitaInfo - despesaInfo).toFixed(2)}</h2>
          <S.Icon color="#66CAD0">
            <FaPiggyBank
              size={24}
            />
          </S.Icon>
        </S.Info>
        <S.Info>
          <span>Despesas</span>
          <h2>R$ {despesaInfo.toFixed(2)} </h2>
          <S.Icon color="#DD3A3A">
            <AiOutlineMinus
              size={24}
            />
          </S.Icon>
        </S.Info>
      </S.ContainerInfos>
    </S.Container>
  )
}

export default Header
