import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {COLORS, FONTS} from '../../constants/theme';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import {useForgotPasswordMutation} from '../../../store/services/auth';
import {Sign_In, VerifyEmail_route} from '../../constants/routes';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';
import Root from '../../components/Root';
import {forgot_password_validation} from '../../../helpers/formValidations';
import {showMessage} from 'react-native-flash-message';

const ForgotPassword = ({navigation}) => {
  const {handleOpenModal, handleCloseModal} = useModal();
  const [forgotPassword] = useForgotPasswordMutation();

  const handleResetPassword = async (values, helpers) => {
    const {email} = values;
    try {
      handleOpenModal({type: FULL_SCREEN_LOADER});
      const res = await forgotPassword({email}).unwrap();
      showMessage({
        type: 'success',
        message: res?.message,
        duration: 6000,
      });
      console.log(res);

      handleCloseModal();
    } catch (error) {
      console.log(error);
      handleCloseModal();
      //   showMessage({
      //     type: 'danger',
      //     message: error?.data?.data || 'Error with sign in. Try again.',
      //   });
      helpers.setFieldError(
        'email',
        error?.data?.error || 'Error with sign in. Try again.',
      );
    }
  };
  return (
    <Root viewStyle={{justifyContent: 'center'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{marginBottom: 20}}>
          <Text style={{...FONTS.h1, textAlign: 'center', marginBottom: 30}}>
            Zuraaya
          </Text>
          <Text style={{...FONTS.fontLg, fontSize: 20, marginBottom: 10}}>
            Forgot your password?
          </Text>
          <Text style={{...FONTS.font}}>
            Please enter your email to reset your password.
          </Text>
        </View>
        <Formik
          initialValues={{email: ''}}
          validationSchema={forgot_password_validation}
          onSubmit={handleResetPassword}
          validateOnBlur={false}>
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              <CustomInput
                label={'Email'}
                placeholder={'Enter Email'}
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address"
                error={errors.email}
              />

              <CustomButton
                onPress={handleSubmit}
                title="Reset Password"
                customStyles={{marginTop: 20}}
              />
            </>
          )}
        </Formik>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 15,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate(Sign_In)}>
            <Text style={{...FONTS.fontLg, color: COLORS.primary}}>
              Remember your password? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Root>
  );
};

export default ForgotPassword;
