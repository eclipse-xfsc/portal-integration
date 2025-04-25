import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { MainContentContainer } from './components/ui/container';
import './scss/App.scss';
import LoginInterceptor from './login/LoginInterceptor';
import AppRoutes from './AppRoutes';
import AppContextProvider from './store/AppContextProvider';

const App = () => {
  return (
    <>
      <AppContextProvider>
        <BrowserRouter>
          <LoginInterceptor>
            <MainContentContainer>
              <Header />
              <AppRoutes></AppRoutes>
              <Footer />
            </MainContentContainer>
          </LoginInterceptor>
        </BrowserRouter>
      </AppContextProvider>
    </>
  );
};

export default App;
