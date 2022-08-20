import React from 'react';
import {
  ChakraProvider, Heading,
  theme
} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import { Signup } from './Components/Signup';
import { Login } from "./Components/Login";
import { Details } from "./Components/Details";
import { Admin } from './Components/Admin';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Heading size="3xl" color="#2B4865" textAlign="center">Brand And Beyond</Heading>
      <Routes>
        <Route path='/' element={<Details />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/:apikey' element={<Admin />} />
      </Routes>

    </ChakraProvider>
  );
}

export default App;
