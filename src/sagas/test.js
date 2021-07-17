import { put, takeEvery } from 'redux-saga/effects';

function* incrementDecrement(action) {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.group('Action Fired!!');
      console.log(action);
      console.groupEnd();
      resolve();
    }, 1000);
  });

  yield put({ type: 'SAGA_COMPLETED' });
}

function* mySaga() {
  yield takeEvery('INCREMENT', incrementDecrement);
  yield takeEvery('DECREMENT', incrementDecrement);
}

export default mySaga;
