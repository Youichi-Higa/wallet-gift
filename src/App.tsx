import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Choice,Confirmation, Form, Top } from 'src/components/pages';
import { paths } from 'src/const/paths';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path={paths.top} element={<Top />} />
        <Route path={paths.form} element={<Form />} />
        <Route path={paths.confirmation} element={<Confirmation />} />
        <Route path={paths.choice} element={<Choice />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
