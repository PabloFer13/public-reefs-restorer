import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';
import reducers from '../reducers';

function counterReducer(state = { count: 0, sagasCompleted: 0 }, action) {
  if (action.type === 'INCREMENT') {
    return {
      ...state,
      count: state.count + 1,
    };
  } else if (action.type === 'DECREMENT') {
    return {
      ...state,
      count: state.count - 1,
    };
  }else if (action.type === 'SAGA_COMPLETED'){
    return {
      ...state,
      sagasCompleted: state.sagasCompleted + 1
    };
  }

  return state;
}

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({ counter: counterReducer, ...reducers });

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
