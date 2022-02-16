import styled from 'styled-components'

export const Container = styled.div` 
  h3 {
    margin-bottom: 28px;
  }
`
export const ContainerInput = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 80px ;
  }

  button {
    height: 40px;
  }
`

export const Grafico = styled.div<{economizar: number}>` 
  width: 100%;
  background: ${({ theme }) => theme.gray2};
  height: 24px;
  margin: 16px 0;
  border-radius: 8px;
  position: relative;

  span {
    position: absolute;
    top: -20px;
    left: ${props => `${100 - props.economizar}%`};
    border-bottom: 1px solid black;
    white-space: nowrap;
  }
`

export const Gastos = styled.div<{gasto: number, economizar: number}>` 
  width: ${props => `${props.gasto}%`};
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.gasto < (100 - props.economizar) ? props.theme.green : props.theme.red};
  color: ${({ theme }) => theme.white};
  border-radius: 8px;
`
