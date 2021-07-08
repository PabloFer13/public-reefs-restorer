import { all } from 'redux-saga/effects';
import testSaga from './test';

function* rootSaga(){
  yield all([testSaga()]);
}

export default rootSaga;
