import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const auth_validation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  password: Yup.string().password().required('Please enter a valid password'),
});
