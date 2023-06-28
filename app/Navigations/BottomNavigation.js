import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainHome from '../Screens/Home/MainHome';
import Categories from '../Screens/Categories/Categories';
import Profile from '../Screens/Account/Profile';
import Cart from '../Screens/Cart/Cart';
import CustomBottomNavigation from './CustomBottomNavigation';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, TouchableOpacity, View} from 'react-native';
import {useGetCartQuery} from '../../store/services/cart';
import {Settings_Route} from '../constants/routes';

const Tab = createBottomTabNavigator();

export function CustomHeader({showBackBtn, ...props}) {
  const [cartCount, setCartCount] = useState(0);
  const {data, isLoading, isSuccess, isError} = useGetCartQuery();
  const length = data?.data?.products?.length;
  useEffect(() => {
    if (isSuccess && data?.data !== null) {
      setCartCount(length);
    } else {
      setCartCount(0);
    }
  }, [isSuccess, length]);

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
      {showBackBtn && (
        <TouchableOpacity onPress={props.navigation.goBack}>
          <View style={{paddingLeft: 10}}>
            <Ionicons name="chevron-back" size={30} style={{marginRight: 5}} />
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Search')}
        style={{flex: 1, height: 35}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLORS.borderColor,
            marginHorizontal: 10,

            paddingHorizontal: 5,
            alignItems: 'center',
            borderRadius: SIZES.radius_sm,
          }}>
          <Ionicons name="search" size={18} style={{marginRight: 5}} />
          <View style={{flex: 1}}>
            <Text style={{...FONTS.fontXs}}>Search for products</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Wishlist')}>
          <Ionicons name="heart-outline" size={25} style={{marginRight: 10}} />
        </TouchableOpacity>
        <View style={{position: 'relative'}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={25} />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              right: -10,
              top: -10,
              height: 15,
              width: 15,
              borderRadius: 15 / 2,
              backgroundColor: COLORS.primary,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 12, color: COLORS.white}}>{cartCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.backgroundColor},
        headerShown: false,
      }}
      initialRouteName={'Home'}
      tabBar={props => <CustomBottomNavigation {...props} />}>
      <Tab.Screen
        name="Home"
        component={MainHome}
        options={{
          header: props => <CustomHeader {...props} />,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Category"
        component={Categories}
        options={{
          header: props => <CustomHeader {...props} />,
          headerShown: true,
        }}
      />
      <Tab.Screen name="Messages" component={Categories} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={({navigation}) => ({
          headerTitle: 'Shopping Cart',
          headerShown: true,
          headerLeft: props => (
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{paddingHorizontal: 10}}>
              <Ionicons name="chevron-back" size={25} />
            </TouchableOpacity>
          ),
          headerRight: props => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Wishlist')}
              style={{paddingHorizontal: 10}}>
              <Ionicons name="heart-outline" size={25} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={({navigation}) => ({
          headerTitle: 'Account',
          headerShown: true,
          headerLeft: props => (
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{paddingHorizontal: 10}}>
              <Ionicons
                name="ios-arrow-back"
                size={25}
                style={{paddingHorizontal: 10}}
              />
            </TouchableOpacity>
          ),
          headerRight: props => (
            <TouchableOpacity
              onPress={() => navigation.navigate(Settings_Route)}
              style={{paddingHorizontal: 10}}>
              <Ionicons
                name="settings-outline"
                size={25}
                style={{paddingHorizontal: 10}}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
