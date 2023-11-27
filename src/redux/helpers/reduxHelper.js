const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createAction(type, payload = {}) {
  return { type, payload };
}

export const createActionCreator = (type) => (payload = {}) => ({ type, payload });

export function createRequestAction(types) {
  return {
    request: (payload) => createAction(types[REQUEST], payload),
    success: (payload) => createAction(types[SUCCESS], payload),
    failure: (payload) => createAction(types[FAILURE], payload),
  };
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export const requestHelpers = (
  type,
  { startFetching = (data) => data, requestSuccess = (data) => data, requestFailure = (data) => data } = {},
) => ({
  [type.REQUEST]: (state, action) => startFetching(state, action),
  [type.SUCCESS]: (state, action) => requestSuccess(state, action),
  [type.FAILURE]: (state, action) => requestFailure(state, action),
});
