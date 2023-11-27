import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer, { NAME as AuthReducerName } from './authorization/authorization';
import UserReducer, { NAME as UserReducerName } from './user/user';
import PostCodeReducer, { NAME as PostCodeReducerName } from './postCode/postCode';
import LoadingReducer, { NAME as LoadingReducerName } from './loader/loader';

const rootReducer = combineReducers({
  form: formReducer,
  [AuthReducerName]: AuthReducer,
  [UserReducerName]: UserReducer,
  [LoadingReducerName]: LoadingReducer,
  [PostCodeReducerName]: PostCodeReducer,
});

export default rootReducer;
