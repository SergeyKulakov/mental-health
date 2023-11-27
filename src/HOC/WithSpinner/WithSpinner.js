import React from 'react';
import Spinner from '../../components/Spinner/Spinner';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...rest }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...rest} />;
};

export default WithSpinner;
