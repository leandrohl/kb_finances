import styled from 'styled-components'

export const Container = styled.div(({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.primary};
  padding: 10px;
  width: 100%;
  height: 100%;
`)

export const Logo = styled.div(({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.primary};
  padding: 10px;
  width: 100%;
  font-weight: bold;

  span {
    padding-left: 4px;
    font-size: 18px;
  }
`)

export const Form = styled.form(({ theme }) => `
   padding: 32px 65px;
   display: flex;
   flex-direction: column;
   width: 440px;
   height: max-content;
   background: ${theme.white};
   box-shadow: ${theme.shadow};
   border: 1px solid ${theme.gray2};
   border-radius: 4px;
   > div {
     margin: 12px 0;
   }
   > button {
     margin-top: 16px;
   }
   @media (max-width: 800px) {
       width: 80%;
       padding: 10px 35px 40px;
   }

   @media (max-width: 500px) {
       width: 100%;
       padding: 10px 35px 40px;
   }
`)

export const CardFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;

  a {
    padding-left: 4px;
    color: ${props => props.theme.primary};
    text-decoration: none;
  }
`
