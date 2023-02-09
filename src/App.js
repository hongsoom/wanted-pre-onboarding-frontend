import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Router from './components/Router/Router';

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
`;