import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Confirmation, Form, Receipt, Top, Transfer } from 'src/components/pages';
import { paths } from 'src/assets';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path={paths.top} element={<Top />} />
        <Route path={paths.form} element={<Form />} />
        <Route path={paths.confirmation} element={<Confirmation />} />
        <Route path={paths.transfer} element={<Transfer />} />
        <Route path={paths.receipt} element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
