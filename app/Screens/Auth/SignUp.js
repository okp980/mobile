import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS, IMAGES, SIZES} from '../../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Pro';
import {useRegisterMutation} from '../../../store/services/auth';
import CustomInput from '../../components/CustomInput';
import {Formik} from 'formik';
import useAuth from '../../../hooks/useAuth';
import {BottomNavigation_Route, Sign_In} from '../../constants/routes';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';

const SignUp = ({navigation}) => {
  const [register, {isLoading, isError}] = useRegisterMutation();
  const {setToken} = useAuth();
  const {handleOpenModal, handleCloseModal} = useModal();

  const handleRegister = async values => {
    const {email, password} = values;
    try {
      handleOpenModal({type: FULL_SCREEN_LOADER});
      const data = await register({email, password}).unwrap();
      setToken(data?.token);
      navigation.navigate(BottomNavigation_Route);
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
      }}>
      <SafeAreaView>
        <View
          style={{
            ...GlobalStyleSheet.container,
            flex: 1,
          }}>
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
            onSubmit={handleRegister}>
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
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
