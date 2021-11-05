/* eslint-disable arrow-body-style */
import styled from 'styled-components';

export const Container = styled.div(({ theme }) => `
  display: flex;
  flex-direction: column;

  > label {
    padding-bottom: 8px;
    color: ${theme.black}
  }

  > span {
    font-size: 12px;
    color: ${theme.red};
    margin-top: 4px;
  }
`);

export const ContainerInput = styled.div(({ theme }) => `
  position: relative;
  display: flex;
   align-items: center;
   
   > svg {
     position: absolute;
     right: 0;
     width: 25px;
     height: 25px;
     color: gray;
     margin-right: 10px;
     cursor: pointer;
   }
   
   .icon-custom {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    color: gray;
    margin-right: 10px;
    cursor: pointer;
    border-left: 1px solid ${theme.gray3};
    margin-left: 130px;
    padding-left: 10px;
   }
`);

export const Input = styled.input(({
  theme, type, disabled,
}) => `
   padding: 14px 10px;
   width: 100%;
   background-color: ${disabled ? theme.gray2 : 'transparent'};
   border-radius: 4px;
   outline-color: ${theme.primary};
   outline-width: thin;
   padding-right: ${type === 'password' && '40px'};
   ::placeholder {
     color: ${theme.gray3};
   }
`);
