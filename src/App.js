import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import Header from './components/Header';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);
  return (
    <>
      {signed ? (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#19171f" />
          <Header />
        </>
      ) : (
        <StatusBar barStyle="light-content" backgroundColor="#22202c" />
      )}
      <Routes />
    </>
  );
}
