/* eslint-disable arrow-body-style */
import styled from 'styled-components';

export const Container = styled.div(({ theme }) => `
  display: flex;
  justify-content: center;
  background: ${theme.primary};
  padding: 10px;
  width: 100%;
  height: 100%;
`);

export const Form = styled.div(({ theme }) => `
   margin-top: 40px;
   padding: 40px 65px;
   display: flex;
   flex-direction: column;
   width: 510px;
   height: max-content;
   box-shadow: ${theme.shadow};
   border: 1px solid ${theme.gray2};
   border-radius: 4px;
   > div {
     margin: 15px 0;
   }
   > button {
     margin-top: 24px;
   }
   @media (max-width: 800px) {
       width: 100%;
       padding: 10px 35px 40px;
   }
`);
