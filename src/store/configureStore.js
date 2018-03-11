import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

export default process.env.NODE_ENV !== 'production' ?
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, createLogger()))) :
  createStore(rootReducer, applyMiddleware(thunk));
