import React from 'react';
import { Router } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import config from './config';
import historyHelper from './helpers/historyService';
import AppRoutes from './AppRoutes';

axios.defaults.baseURL = config.baseURL;

const App = () => (
  <Provider store={store}>
    <Router history={historyHelper}>
      <div>
        <AppRoutes />
      </div>
    </Router>
  </Provider>
);

export default App;
