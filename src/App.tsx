import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './contexts/Auth';
import { MonetaryProvider } from './contexts/Monetary';
import Routes from './routes';
import GlobalStyle from './styles/global';
import Theme from './styles/theme';
import ToastNotificationContainer from './components/ToastNotification/ToastNotificationContainer'

function App() {
  return (
    <AuthProvider>
      <MonetaryProvider> 
        <ThemeProvider theme={Theme}>
          <Routes />
          <ToastNotificationContainer />
          <GlobalStyle />
        </ThemeProvider>
      </MonetaryProvider> 
    </AuthProvider>
  );
}

export default App;
