import { put, takeEvery } from 'redux-saga/effects';
import appActions from 'actions';

function* getUserResourcesSaga(action) {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.group('Action Fired!!');
      console.log(action);
      console.groupEnd();
      resolve();
    }, 1000);
  });

  console.log('Get User Resources saga');
}


function* getLevelDetailsSaga(action) {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      console.group('Action Fired!!');
      console.log(action);
      console.groupEnd();
      resolve();
    }, 1000);
  });

  console.log('Level Details saga');
}
function* levelSaga() {
  yield takeEvery(appActions.level.getUserResources.type, getUserResourcesSaga);
  yield takeEvery(appActions.level.getLevelDetails.type, getLevelDetailsSaga);
}

export default levelSaga;
