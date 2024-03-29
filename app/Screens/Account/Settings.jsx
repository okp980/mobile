import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  Address_Route,
  BottomNavigation_Route,
  EditProfile_Route,
  ManageAccount_Route,
  Notification_Preference_Route,
} from '../../constants/routes';
import Card from '../../components/Card';
import ListItem from '../../components/ListItem';
import {Divider} from 'react-native-paper';
import {COLORS, FONTS} from '../../constants/theme';
import useAuth from '../../../hooks/useAuth';
import Root from '../../components/Root';

const profileInfo = [
  {
    name: 'Address Book',
    path: Address_Route,
  },
  {
    name: 'Change Password',
    path: EditProfile_Route,
  },
];

const utilInfo = [
  // {
  //   name: 'Manage Cookies',
  //   path: '',
  // },
  {
    name: 'About Zuraaya',
    url: 'https://zuraaya.com/about',
  },
  // {
  //   name: 'Clear Cache',
  //   path: '',
  // },
  // {
  //   name: 'Currency',
  //   path: '',
  // },
  {
    name: 'Notification Preference',
    path: Notification_Preference_Route,
  },
];

const Settings = ({navigation}) => {
  const {token, handleLogout} = useAuth();
  const handleSignOut = () => {
    handleLogout();
    navigation.navigate(BottomNavigation_Route);
  };
  return (
    <Root noPadding>
      <ScrollView style={{flex: 1}}>
        {token && (
          <Card>
            {profileInfo.map((item, index) => (
              <>
                <ListItem item={item} key={index} />
                {index !== profileInfo.length - 1 && (
                  <Divider
                    style={{
                      backgroundColor: COLORS.borderColor,
                      marginHorizontal: 20,
                    }}
                  />
                )}
              </>
            ))}
          </Card>
        )}
        <Card>
          {utilInfo.map((item, index) => (
            <>
              <ListItem item={item} key={index} />
              {index !== utilInfo.length - 1 && (
                <Divider
                  style={{
                    backgroundColor: COLORS.borderColor,
                    marginHorizontal: 20,
                  }}
                />
              )}
            </>
          ))}
        </Card>
        {token && (
          <Card>
            <TouchableOpacity onPress={handleSignOut}>
              <Text
                style={{
                  ...FONTS.fontLg,
                  ...FONTS.fontBold,
                  paddingVertical: 15,
                  textAlign: 'center',
                  color: COLORS.danger,
                }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </Card>
        )}
        <Text style={{...FONTS.font, textAlign: 'center', paddingVertical: 15}}>
          Version v1.0.1
        </Text>
      </ScrollView>
    </Root>
  );
};

export default Settings;

const styles = StyleSheet.create({});
