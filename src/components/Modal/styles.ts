import styled from 'styled-components'

export const Container = styled.div(({ theme }) => `
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 10;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: rgb(0 0 0 / 80%);
  @media (max-width: 800px) {
    height: 100%;
   }
`)

export const Content = styled.div(({ theme }) => `
  padding: 20px;
  background-color: ${theme.white};
  box-shadow: ${theme.shadow};
  border-radius: 4px;
  min-width: 500px;
  height: max-content;
  overflow-y: auto;
  @media (max-width: 800px) {
    min-width: 100%;
    max-height: 100%;
   }
`)

export const Header = styled.header(({ theme }) => `
   width: 100%;
   color: ${theme.primary};
   display: flex;
   justify-content: space-between;
   margin-bottom: 24px;
   > svg {
     cursor: pointer;
     font-size: 24px;
     &:hover {
       color: ${theme.primary};
     }
   }
`)
