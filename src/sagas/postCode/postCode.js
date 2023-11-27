import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { axiosInstance } from '../../utils/axiosLogger';
import { QUERY_POST_CODES } from '../../constants/api';
import { types, actions } from '../../redux/postCode/postCode';

const fetchPostCodesUtil = async (query) => {
  try {
    const result = await axiosInstance.get(QUERY_POST_CODES(query));
    return get(result.data, 'result', []);
  } catch (e) {
    return [];
  }
};

function* fetchPostCodes({ payload }) {
  try {
    const result = yield call(fetchPostCodesUtil, payload);
    yield put(actions.queryPostcodes.success(result));
  } catch (e) {
    yield put(actions.queryPostcodes.failure(e));
    yield call(alert, e);
  }
}

export default function* () {
  yield takeLatest(types.QUERY_POSTCODES.REQUEST, fetchPostCodes);
}
