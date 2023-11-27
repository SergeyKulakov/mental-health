const EMAIL_TEMPLATE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,400}$/i;
const PASSWORD_TEMPLATE = /^[\S]{6,40}$/i;
const POSTAL_CODE_TEMPLATE = /^([A-Z][A-Z0-9]?[A-Z0-9]?[A-Z0-9]? {1,2}[0-9][A-Z0-9]{2})$/;
const PHONE_TEMPLATE = /^[0-9]{10}$/;
const UK_STATE = /^[A-Z0-9]{2,3}$/;
const NAME_TEMPLATE = /^[A-Za-z0-9\s-]+$/;

export const isFieldExist = (key) => (value) => (!value[key] ? { [key]: 'Required' } : null);

export const validateByEmail = (key) => (value) => {
  if (!EMAIL_TEMPLATE.test(value[key])) {
    return { [key]: 'Invalid email address' };
  }
  return null;
};

export const validateByName = (key) => (value) => {
  if (!NAME_TEMPLATE.test(value[key])) {
    return { [key]: 'You cannot use special characters in your first or last name' };
  }
  return null;
};

export const validateByPassword = (key) => (value) => {
  if (!PASSWORD_TEMPLATE.test(value[key])) {
    return { [key]: 'Password must be at least 6 characters long.' };
  }
  return null;
};

export const isNumber = (key) => (value) => {
  if (value[key] && Number.isNaN(Number(value[key]))) {
    return { [key]: 'Must be a number' };
  } else {
    return undefined;
  }
};

export const validateByPostalCode = (key) => (value) => {
  if (!POSTAL_CODE_TEMPLATE.test(value[key])) {
    return { [key]: 'Postal Code must be at least 6 characters long' };
  }
  return null;
};

export const validateByPhone = (key) => (value) => {
  if (!PHONE_TEMPLATE.test(value[key])) {
    return { [key]: 'Phone must be 10 characters long.' };
  }
  return null;
};

export const validateByState = (key) => (value) => {
  if (!UK_STATE.test(value[key])) {
    return { [key]: 'State code can be from 2 to 3 characters long' };
  }
  return null;
};
export const isPasswordsIdentical = (key, secondKey) => (value) => {
  if (value[key] !== value[secondKey]) {
    return { [secondKey]: 'Passwords mismatched' };
  }
  return null;
};

export const signInFormValidation = (values) => ({
  ...validateByEmail('loginEmail')(values),
  ...validateByPassword('loginPassword')(values),
  ...isFieldExist('loginEmail')(values),
  ...isFieldExist('loginPassword')(values),
});

export const restorePasswordFormValidation = (values) => ({
  ...validateByEmail('restoreEmail')(values),
  ...isFieldExist('restoreEmail')(values),
});

export const enterEmailValidator = (values) => ({
  ...validateByEmail('signUpEmail')(values),
  ...isFieldExist('signUpEmail')(values),
});

export const createNewPasswordValidator = (values) => {
  return {
    ...isFieldExist('createPassword')(values),
    ...isFieldExist('confirmPassword')(values),
    ...validateByPassword('createPassword')(values),
    ...isPasswordsIdentical('createPassword', 'confirmPassword')(values),
  };
};

export const additionalInfoValidator = (keys) => (value) =>
  keys.reduce((acc, key) => {
    return { ...acc, ...isFieldExist(key)(value) };
  }, {});

export const personalInfoFormValidation = (values) => ({
  ...isNumber('phone')(values),
  ...isFieldExist('firstName')(values),
  ...isFieldExist('lastName')(values),
  ...isFieldExist('phone')(values),
  ...validateByPhone('phone')(values),
  ...isFieldExist('address1')(values),
  ...isFieldExist('city')(values),
  ...isFieldExist('state')(values),
  ...isFieldExist('dateOfBirth')(values),
  ...validateByName('firstName')(values),
  ...validateByName('lastName')(values),
});

export const clientInfoFormValidation = (values) => ({
  ...isFieldExist('firstName')(values),
  ...isFieldExist('lastName')(values),
  ...isFieldExist('phone')(values),
  ...validateByPhone('phone')(values),
  ...isFieldExist('address1')(values),
  ...validateByName('firstName')(values),
  ...validateByName('lastName')(values),
  ...isFieldExist('dateOfBirth')(values),
});

export const addSomeInformation = (values) => ({
  ...isFieldExist('description')(values),
});
