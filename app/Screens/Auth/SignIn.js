import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {COLORS, FONTS, IMAGES, SIZES} from '../../constants/theme';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import {useSignInMutation} from '../../../store/services/auth';
import useAuth from '../../../hooks/useAuth';
import {
  BottomNavigation_Route,
  Forgot_Password_route,
  Sign_Up,
} from '../../constants/routes';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';
import Root from '../../components/Root';
import {auth_validation} from '../../../helpers/formValidations';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Pro';
import {getDeepLink} from '../../../helpers/util';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {baseURL} from '../../../config/api';

const SignIn = ({navigation, route}) => {
  const from = route?.params?.from;
  const [signIn] = useSignInMutation();
  const {setToken} = useAuth();
  const {handleOpenModal, handleCloseModal} = useModal();

  async function onLogin() {
    const deepLink = getDeepLink('token/');
    // const deepLink = 'http://localhost:4000/api/v1/auth/google/callback';
    const url = `${baseURL}/auth/google?redirect_uri=${deepLink}`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        })
          .then(response => {
            console.log('response from resolver: ' + JSON.stringify(response));
            if (response.type === 'success' && response.url) {
              Linking.openURL(response.url);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }

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
    <Root>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, justifyContent: 'space-around'}}>
        <View>
          <Text
            style={{
              ...FONTS.h1,
              ...FONTS.fontBold,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
            Zuraaya
          </Text>
        </View>
        <View>
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
                <View style={{marginTop: 10}} />
                <CustomButton onPress={handleSubmit} title="Sign In" />
              </>
            )}
          </Formik>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate(Forgot_Password_route)}>
              <Text style={{...FONTS.font, color: COLORS.text}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 15,
            }}>
            <TouchableOpacity
              onPress={onLogin}
              style={{
                borderWidth: 1,
                height: 50,
                borderRadius: SIZES.radius_sm,
                borderColor: COLORS.borderColor,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                flexDirection: 'row',
              }}>
              <Image
                style={{height: 22, width: 22, marginRight: 10}}
                source={IMAGES.google}
              />
              <Text style={{...FONTS.font}}>Sign in with Google</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={{
              height: 50,
              borderRadius: SIZES.radius_sm,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#305CCD',
              flex: 1,
              marginLeft: 10,
            }}>
            <FontAwesome5Brands color={'#fff'} name="facebook" size={22} />
          </TouchableOpacity> */}
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.font,
                color: COLORS.title,
                textAlign: 'center',
                marginRight: 7,
              }}>
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(Sign_Up)}>
              <Text
                style={{
                  ...FONTS.fontLg,
                  ...FONTS.fontBold,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Register now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Root>
  );
};

export default SignIn;
