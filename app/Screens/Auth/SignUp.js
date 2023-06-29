import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {COLORS, FONTS, IMAGES, SIZES} from '../../constants/theme';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Pro';
import {useRegisterMutation} from '../../../store/services/auth';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import useAuth from '../../../hooks/useAuth';
import {BottomNavigation_Route, Sign_In} from '../../constants/routes';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';
import Root from '../../components/Root';
import {auth_validation} from '../../../helpers/formValidations';

const SignUp = ({navigation}) => {
  const [register] = useRegisterMutation();
  const {setToken} = useAuth();
  const {handleOpenModal, handleCloseModal} = useModal();

  const handleRegister = async (values, helpers) => {
    const {email, password} = values;
    try {
      handleOpenModal({type: FULL_SCREEN_LOADER});
      const data = await register({email, password}).unwrap();
      setToken(data?.token);
      navigation.navigate(BottomNavigation_Route);
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
      helpers.setFieldError(
        'password',
        error?.data?.error || 'Error with sign up. Try again.',
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
        <View style={{marginBottom: 20}}>
          <Text style={{...FONTS.h3}}>Register Account</Text>
          <Text style={{...FONTS.font}}>
            Join to enjoy nice and interesting products
          </Text>
        </View>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={auth_validation}
          onSubmit={handleRegister}
          validateOnBlur={false}>
          {({handleChange, handleSubmit, values, errors}) => (
            <>
              <CustomInput
                label={'Email'}
                placeholder={'Enter Email'}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
                value={values.email}
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

              <CustomButton onPress={handleSubmit} title="Register" />
            </>
          )}
        </Formik>
        <Text style={{...FONTS.font, marginTop: 15}}>
          By tapping “Sign Up” you accept our terms and condition.
        </Text>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              ...FONTS.font,
              color: COLORS.title,
              textAlign: 'center',
              marginBottom: 12,
            }}>
            Already have an account?
          </Text>
          <CustomButton
            outline
            title="Continue with email"
            onPress={() => navigation.navigate(Sign_In)}
          />

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 15,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: 50,
                borderRadius: SIZES.radius,
                borderColor: COLORS.borderColor,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginRight: 10,
              }}>
              <Image style={{height: 22, width: 22}} source={IMAGES.google} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#305CCD',
                flex: 1,
                marginLeft: 10,
              }}>
              <FontAwesome5Brands color={'#fff'} name="facebook" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Root>
  );
};

export default SignUp;
