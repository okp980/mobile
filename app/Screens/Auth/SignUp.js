import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
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
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {getDeepLink} from '../../../helpers/util';

const SignUp = ({navigation}) => {
  const [register] = useRegisterMutation();
  const {setToken} = useAuth();
  const {handleOpenModal, handleCloseModal} = useModal();

  async function onLogin() {
    const deepLink = getDeepLink('token/');
    // const deepLink = 'http://localhost:4000/api/v1/auth/google/callback';
    const url = `http://localhost:4000/api/v1/auth/google?redirect_uri=${deepLink}`;
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

  const handleRegister = async (values, helpers) => {
    const {email, password} = values;
    try {
      handleOpenModal({type: FULL_SCREEN_LOADER});
      const data = await register({email, password}).unwrap();
      setToken(data?.token);
      navigation.replace(BottomNavigation_Route);
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
            onSubmit={handleRegister}
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
                <CustomButton onPress={handleSubmit} title="Sign Up" />
              </>
            )}
          </Formik>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}></View>

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
              <Text style={{...FONTS.font}}>Sign up with Google</Text>
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
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(Sign_In)}>
              <Text
                style={{
                  ...FONTS.fontLg,
                  ...FONTS.fontBold,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Root>
  );
};

export default SignUp;
