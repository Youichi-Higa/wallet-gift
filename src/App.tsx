import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Choice, Form, Top } from 'src/components/pages';
import { path } from './const';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path={path.top} element={<Top />} />
        <Route path={path.form} element={<Form />} />
        <Route path={path.choice} element={<Choice />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
