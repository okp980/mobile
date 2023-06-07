import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, IMAGES, SIZES} from '../../constants/theme';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import {useSignInMutation} from '../../../store/services/auth';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../../store/feature/auth/authSlice';

const SignIn = ({navigation, route}) => {
  const {from} = route.params;
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const handleSignIn = async values => {
    const {email, password} = values;
    try {
      const data = await signIn({email, password}).unwrap();
      dispatch(setCredentials(data?.token));
      navigation.navigate(from);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            ...GlobalStyleSheet.container,
          }}>
          <View style={{marginBottom: 20}}>
            <Text style={{...FONTS.h1, textAlign: 'center'}}>Zuraaya</Text>
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={handleSignIn}>
            {({handleChange, handleSubmit, values}) => (
              <>
                <CustomInput
                  label={'Email'}
                  placeholder={'Enter Email'}
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                <CustomInput
                  label={'Password'}
                  placeholder={'Enter Password'}
                  isPassword
                  onChangeText={handleChange('password')}
                  value={values.password}
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
              onPress={() => props.navigation.navigate('SignUp')}
              outline
              title="Register now"
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
