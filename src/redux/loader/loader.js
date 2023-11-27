import { createReducer, createActionCreator } from '../helpers/reduxHelper';

export const NAME = 'loader';

const initialState = {
  isFetching: null,
};

const startFetching = (state) => ({ ...state, isFetching: true });
const stopFetching = (state) => ({ ...state, isFetching: false });

export const types = {
  START_LOADING: `${NAME}/START_LOADING`,
  STOP_LOADING: `${NAME}/STOP_LOADING`,
};

export const actions = {
  startLoading: createActionCreator(types.START_LOADING),
  stopLoading: createActionCreator(types.STOP_LOADING),
};

export const handlers = {
  [types.START_LOADING]: startFetching,
  [types.STOP_LOADING]: stopFetching,
};

export default createReducer(initialState, handlers);
