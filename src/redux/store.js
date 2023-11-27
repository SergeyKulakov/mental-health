import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore((state, actions) => {
  if (actions.type === 'authorization/SIGN_OUT') {
    const filteredStore = Object.keys(state).reduce((acc, item) => {
      const itemKeys = Object.keys(state[item]);
      const storeItemObject = itemKeys.reduce(
        (acc, nestedItem) => ({ ...acc, [nestedItem]: nestedItem === 'avatarUrl' ? '' : null }),
        {},
      );
      return { ...acc, [item]: item === 'form' ? state[item] : storeItemObject };
    }, {});
    return rootReducer(filteredStore, actions);
  } else {
    return rootReducer(state, actions);
  }
}, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
