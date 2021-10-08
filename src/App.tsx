import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './contexts/Auth';
import { Routes } from './routes';
import GlobalStyle from './styles/global';
import Theme from './styles/theme';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <Routes />
        <GlobalStyle />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
