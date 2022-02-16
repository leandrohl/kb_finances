/* eslint-disable arrow-body-style */
import styled from 'styled-components'

export const Container = styled.div<{error: boolean | undefined}>(({ theme, error }) => `
  display: flex;
  flex-direction: column;

  > label {
    padding-bottom: 8px;
    font-size: 14px;
    color: ${error ? theme.red : theme.black}
  }

  > span {
    font-size: 12px;
    color: ${theme.red};
    margin-top: 4px;
  }
`)

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

   span {
     padding-left: 8px;
     font-size: 20px;
   }
`)

export const Input = styled.input<{error: boolean | undefined}>(({
  theme, type, disabled, error
}) => `
   padding: 14px 10px;
   width: 100%;
   background-color: ${disabled ? theme.gray2 : 'transparent'};
   border-radius: 4px;
   outline-color: ${theme.primary};
   outline-width: thin;
   padding-right: ${type === 'password' && '40px'};
   border: 1px solid ${error && theme.red};
   ::placeholder {
     color: #fff;
   }
`)
