import { all } from 'redux-saga/effects';
import testSaga from './test';
import levelSaga from './level';

function* rootSaga(){
  yield all([testSaga(), levelSaga()]);
}

export default rootSaga;
