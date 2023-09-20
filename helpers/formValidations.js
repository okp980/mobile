import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const auth_validation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  password: Yup.string().password().required('Please enter a valid password'),
});
export const forgot_password_validation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});
export const address_validation = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  phoneNumber: Yup.string().required('Phone Number is Required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  country: Yup.string().required('Country is Required'),
  state: Yup.string().required('State is Required'),
  lga: Yup.string().required('LGA is Required'),
  // city: Yup.string().required('City is Required'),
  address: Yup.string().required('Address is Required'),
});
export const change_password_validation = Yup.object().shape({
  current_password: Yup.string().required('Current Password is required'),
  new_password: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must contain 8 or more characters')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minSymbols(1, 'Password must contain at least 1 special character'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('new_password'), null], 'Passwords does not match'),
});
export const reset_change_password_validation = Yup.object().shape({
  new_password: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must contain 8 or more characters')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minSymbols(1, 'Password must contain at least 1 special character'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('new_password'), null], 'Passwords does not match'),
});
