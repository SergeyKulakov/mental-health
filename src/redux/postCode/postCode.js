import {
  createReducer,
  createRequestTypes,
  createRequestAction,
  requestHelpers,
  createAction,
  createActionCreator,
} from '../helpers/reduxHelper';

export const NAME = 'postcodes';

const initialState = {
  isFetching: false,
  error: null,
  fetchedPostCodes: [],
  selectedPostCode: '',
};

const startFetching = (state) => ({ ...state, isFetching: true, error: null });
const requestSuccess = (state, { payload }) => ({
  ...state,
  isFetching: false,
  error: null,
  fetchedPostCodes: payload,
});
const requestFailure = (state, { payload }) => ({ ...state, error: payload, isFetching: false });
const setSelectedPostCodes = (state, { payload }) => ({ ...state, selectedPostCodes: payload });

export const types = {
  QUERY_POSTCODES: createRequestTypes(`${NAME}/QUERY_POSTCODES`),
  SELECTED_POSTCODES: `${NAME}/SELECTED_POSTCODES`,
};

export const actions = {
  queryPostcodes: createRequestAction(types.QUERY_POSTCODES),
  selectedPostCodes: createActionCreator(types.SELECTED_POSTCODES),
};

export const handlers = {
  [types.SELECTED_POSTCODES]: setSelectedPostCodes,
  ...requestHelpers(types.QUERY_POSTCODES, {
    startFetching,
    requestSuccess,
    requestFailure,
  }),
};

export default createReducer(initialState, handlers);
