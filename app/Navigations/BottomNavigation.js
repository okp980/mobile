import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainHome from '../Screens/Home/MainHome';
import Categories from '../Screens/Categories/Categories';
import Profile from '../Screens/Account/Profile';
import Cart from '../Screens/Cart/Cart';
import CustomBottomNavigation from './CustomBottomNavigation';
import {TouchableOpacity} from 'react-native';
import {
  Account_Route,
  Cart_Route,
  Category_Route,
  Home_Route,
  Messages_Route,
  Settings_Route,
  Wishlist_Route,
} from '../constants/routes';
import {CustomHeader} from './Header/CustomHeader';
import {screenOptions} from './Header/screenOptions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/theme';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerLeftContainerStyle: {paddingHorizontal: 20},
        headerRightContainerStyle: {paddingHorizontal: 20},
      }}
      initialRouteName={Home_Route}
      tabBar={props => <CustomBottomNavigation {...props} />}>
      <Tab.Screen
        name={Home_Route}
        component={MainHome}
        options={{
          header: props => <CustomHeader {...props} />,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={Category_Route}
        component={Categories}
        options={{
          header: props => <CustomHeader {...props} />,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={Messages_Route}
        component={Categories}
        options={{
          header: props => <CustomHeader {...props} />,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={Cart_Route}
        component={Cart}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Shopping Cart',
              headerLeft: props => null,
              headerRight: props => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(Wishlist_Route)}>
                  <Ionicons
                    name="heart-outline"
                    size={25}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              ),
            },
          })
        }
      />
      <Tab.Screen
        name={Account_Route}
        component={Profile}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Account',
              headerLeft: props => null,
              headerRight: props => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(Settings_Route)}>
                  <Ionicons
                    name="settings-outline"
                    size={25}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              ),
            },
          })
        }
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
