import styled, { keyframes } from 'styled-components'

export const Button = styled.button((props) => `
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props.color || props.theme.primary};
  border: 0;
  padding: 12px;
  color: ${props.theme.white};
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: all .2s;

   &:hover, &:disabled {
     background-color: ${props.color || props.theme.primary} ;
     opacity: 0.8
   }
`)

export const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`

export const Loading = styled.div`
  animation: ${rotate} 2s linear infinite;
`
