import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainHome from '../Screens/Home/MainHome';
import Categories from '../Screens/Categories/Categories';
import Profile from '../Screens/Account/Profile';
import Cart from '../Screens/Cart/Cart';
import CustomBottomNavigation from './CustomBottomNavigation';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

function LogoTitle(props) {
  return (
    <View
      style={{
        backgroundColor: COLORS.backgroundColor,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        paddingBottom: 10,
      }}>
      {/* <View>
        <Text>Zuraaya</Text>
      </View> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: COLORS.borderColor,
          marginHorizontal: 10,
          height: 35,
          paddingHorizontal: 5,
          alignItems: 'center',
          borderRadius: SIZES.radius_sm,
        }}>
        <Ionicons name="search" size={18} style={{marginRight: 5}} />
        <View style={{flex: 1}}>
          <Text style={{...FONTS.fontXs}}>Search for products</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Ionicons name="heart-outline" size={25} style={{marginRight: 10}} />
        <Ionicons name="cart-outline" size={25} />
      </View>
    </View>
  );
}

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: true,
        // headerStyle: {backgroundColor: COLORS.backgroundColor},
        // headerTintColor: COLORS.title,
        header: props => <LogoTitle {...props} />,
      }}
      initialRouteName={'Home'}
      tabBar={props => <CustomBottomNavigation {...props} />}>
      <Tab.Screen name="Home" component={MainHome} />
      <Tab.Screen name="Category" component={Categories} />
      <Tab.Screen name="Messages" component={Categories} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
