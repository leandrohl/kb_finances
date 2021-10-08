import styled, { keyframes } from 'styled-components';

export const Button = styled.button(({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.primary};
  border: 0;
  padding: 12px;
  color: ${theme.white};
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: all .2s;

   &:hover, &:disabled {
     background-color: #5E3F7D ;
   }
`);

export const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
  animation: ${rotate} 2s linear infinite;
`;
