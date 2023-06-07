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

const SignIn = props => {
  const [isFocused, setisFocused] = useState(false);
  const [isFocused2, setisFocused2] = useState(false);
  const [handlePassword, setHandlePassword] = useState(true);

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

          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={GlobalStyleSheet.label}>Username</Text>
            <TextInput
              style={[
                GlobalStyleSheet.formControl,
                isFocused && GlobalStyleSheet.activeInput,
              ]}
              onFocus={() => setisFocused(true)}
              onBlur={() => setisFocused(false)}
              placeholder="Type Username Here"
              placeholderTextColor={COLORS.label}
            />
          </View>
          <View style={GlobalStyleSheet.inputGroup}>
            <Text style={GlobalStyleSheet.label}>Password</Text>
            <View>
              <TouchableOpacity
                onPress={() => setHandlePassword(!handlePassword)}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 0,
                }}>
                {handlePassword ? (
                  <FeatherIcon name="eye" color={COLORS.secondary} size={22} />
                ) : (
                  <FeatherIcon
                    name="eye-off"
                    color={COLORS.secondary}
                    size={22}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={[
                  GlobalStyleSheet.formControl,
                  isFocused2 && GlobalStyleSheet.activeInput,
                ]}
                onFocus={() => setisFocused2(true)}
                onBlur={() => setisFocused2(false)}
                secureTextEntry={handlePassword}
                placeholder="Type Password Here"
                placeholderTextColor={COLORS.label}
              />
            </View>
          </View>

          <CustomButton
            onPress={() => props.navigation.navigate('DrawerNavigation')}
            title="Login"
          />

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
