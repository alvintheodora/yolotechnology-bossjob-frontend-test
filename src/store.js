import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

export default () => {

  const middlewares = [applyMiddleware(promise, thunk)];
  const composeMiddlewares =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

  const store = createStore(
    reducers, 
    {},  
    composeMiddlewares(...middlewares)
  );

  return store
}