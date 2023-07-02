import React, {useState} from 'react';
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
import {useSignInMutation} from '../../../store/services/auth';
import useAuth from '../../../hooks/useAuth';
import {BottomNavigation_Route, Sign_Up} from '../../constants/routes';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';
import Root from '../../components/Root';
import {auth_validation} from '../../../helpers/formValidations';

const SignIn = ({navigation, route}) => {
  const from = route?.params?.from;
  const [signIn] = useSignInMutation();
  const {setToken} = useAuth();
  const {handleOpenModal, handleCloseModal} = useModal();

  const handleSignIn = async (values, helpers) => {
    const {email, password} = values;
    try {
      handleOpenModal({type: FULL_SCREEN_LOADER});
      const data = await signIn({email, password}).unwrap();
      setToken(data?.token);
      navigation.replace(from || BottomNavigation_Route);
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
      helpers.setFieldError(
        'password',
        error?.data?.error || 'Error with sign in. Try again.',
      );
    }
  };
  return (
    <Root viewStyle={{justifyContent: 'center'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{marginBottom: 20}}>
          <Text style={{...FONTS.h1, textAlign: 'center'}}>Zuraaya</Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={auth_validation}
          onSubmit={handleSignIn}
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
              <CustomInput
                label={'Password'}
                placeholder={'Enter Password'}
                isPassword
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
              />

              <CustomButton onPress={handleSubmit} title="Sign In" />
            </>
          )}
        </Formik>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 15,
          }}>
          <TouchableOpacity>
            <Text style={{...FONTS.fontLg, color: COLORS.primary}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              ...FONTS.font,
              color: COLORS.title,
              textAlign: 'center',
              marginBottom: 12,
            }}>
            Don’t have an account?
          </Text>
          <CustomButton
            onPress={() => navigation.navigate(Sign_Up)}
            outline
            title="Register now"
          />
        </View>
      </KeyboardAvoidingView>
    </Root>
  );
};

export default SignIn;
