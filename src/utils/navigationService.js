import { CommonActions } from '@react-navigation/native';

const config = {};

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(props) {
  if (config.navigator && props) {
    config.navigator.dispatch({ ...props });
  }
}

export function goBack() {
  if (config.navigator) {
    const action = CommonActions.back({});
    config.navigator.dispatch(action);
  }
}
