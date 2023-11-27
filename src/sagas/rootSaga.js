import { all, call } from 'redux-saga/effects';
import AuthSaga from './authorization/authorization';
import UserSaga from './user/user';
import PostCodesSaga from './postCode/postCode';

export default function* rootSaga() {
  yield all([call(AuthSaga), call(UserSaga), call(PostCodesSaga)]);
}
