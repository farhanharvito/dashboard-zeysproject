import React from 'react';
import UnderConstruction from './components/UnderConstruction';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/montserrat/400.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AppRoutes } from './routes/AppRoutes';
import theme from './theme';
import SignIn from './pages/signin/SignIn';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
