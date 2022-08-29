import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import store, { persistor } from './store';

import history from './services/history';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={4000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
