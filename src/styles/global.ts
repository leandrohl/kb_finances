import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  html, body, #root {
     -webkit-font-smoothing: antialiased !important;
     font-family: 'Montserrat', sans-serif;
     width: 100%;
     height: 100%;

     .customScroll {
    &::-webkit-scrollbar {
      border-radius: 8px;
      min-height: 16px;
      height: 36px;
      width: 4px;
      background: #f8f9fa;
    }

    &::-webkit-scrollbar-thumb {
      background: #835DAA;
      min-height: 8px;
      height: 8px;
      border-radius: 8px;
    }
  }
  }
  button {
    cursor : pointer;
  }
`
