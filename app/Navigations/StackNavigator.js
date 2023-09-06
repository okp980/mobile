import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../Screens/Auth/SignUp';
import SignIn from '../Screens/Auth/SignIn';
import ProductDetail from '../Screens/Products/ProductDetail';
import Orders from '../Screens/Orders/Orders';
import DeliveryTracking from '../Screens/Delivery/DeliveryTracking';
import Wishlist from '../Screens/Wishlist/Wishlist';
import EditProfile from '../Screens/Account/EditProfile';
import Coupons from '../Screens/Account/Coupons';
import Address from '../Screens/Account/Address';
import AddDeliveryAddress from '../Screens/Account/AddDeliveryAddress';
import Filter from '../Screens/Filter/Filter';
import Items from '../Screens/Items/Items';

import Search from '../Screens/Search/Search';
import Payment from '../Screens/Delivery/Payment';

import Socials from '../Screens/Components/Socials';

import ConfirmOrder from '../Screens/ConfirmOrder';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Add_Delivery_Address,
  Add_Review_Route,
  Address_Route,
  BottomNavigation_Route,
  Confirm_Order,
  Coupons_Route,
  DeliveryTracking_Route,
  EditProfile_Route,
  Filter_Route,
  Forgot_Password_route,
  Items_Route,
  Notification_Preference_Route,
  OrderDetail_Route,
  Orders_Route,
  Payment_Route,
  PaystackPayment_Route,
  ProductDetail_Route,
  Reset_Change_Password_route,
  Search_Route,
  Settings_Route,
  Sign_In,
  Sign_Up,
  VerifyEmail_route,
  Wishlist_Route,
} from '../constants/routes';
import PaystackPayment from '../Screens/PaystackPayment';
import OrderDetail from '../Screens/Orders/OrderDetail';
import Settings from '../Screens/Account/Settings';
import {screenOptions} from './Header/screenOptions';
import {CustomHeader} from './Header/CustomHeader';
import BottomNavigation from './BottomNavigation';
import CustomSearchHeader from './Header/CustomSearchHeader';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import NotificationPreference from '../Screens/Account/NotificationPreference';
import AddReview from '../Screens/Review/AddReview';

const StackComponent = createNativeStackNavigator();

const screens = [
  {
    name: Sign_Up,
    component: SignUp,
    options: {gestureDirection: 'vertical'},
  },
  {
    name: Sign_In,
    component: SignIn,
    options: {gestureDirection: 'vertical'},
  },
  {
    name: BottomNavigation_Route,
    component: BottomNavigation,
    options: false,
  },
];

const StackNavigator = () => {
  return (
    <StackComponent.Navigator
      initialRouteName={BottomNavigation_Route}
      detachInactiveScreens={true}
      screenOptions={{
        headerShown: false,
      }}>
      <StackComponent.Screen
        name={Sign_Up}
        component={SignUp}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {gestureDirection: 'vertical', headerShown: false},
          })
        }
      />
      <StackComponent.Screen
        name={Sign_In}
        component={SignIn}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {gestureDirection: 'vertical', headerShown: false},
          })
        }
      />
      <StackComponent.Screen
        name={Forgot_Password_route}
        component={ForgotPassword}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {gestureDirection: 'vertical', headerShown: false},
          })
        }
      />

      <StackComponent.Screen
        name={BottomNavigation_Route}
        component={BottomNavigation}
      />

      <StackComponent.Screen
        name={ProductDetail_Route}
        options={({navigation, route}) => ({
          headerShown: true,
          header: () => (
            <CustomHeader showBackBtn navigation={navigation} route={route} />
          ),
        })}
        component={ProductDetail}
      />

      <StackComponent.Screen
        name={Orders_Route}
        component={Orders}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'My Orders',
            },
          })
        }
      />
      <StackComponent.Screen
        name={OrderDetail_Route}
        component={OrderDetail}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Order Details',
            },
          })
        }
      />

      <StackComponent.Screen
        name={Confirm_Order}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Confirm Order',
            },
          })
        }
        component={ConfirmOrder}
      />
      <StackComponent.Screen
        name={Add_Review_Route}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Add Review',
            },
          })
        }
        component={AddReview}
      />
      <StackComponent.Screen
        name={DeliveryTracking_Route}
        component={DeliveryTracking}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
          })
        }
      />
      <StackComponent.Screen
        name={Wishlist_Route}
        component={Wishlist}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {headerTitle: 'Wishlist'},
          })
        }
      />
      <StackComponent.Screen
        name={Settings_Route}
        component={Settings}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {headerTitle: 'Settings'},
          })
        }
      />
      <StackComponent.Screen
        name={EditProfile_Route}
        component={EditProfile}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {headerTitle: 'Change Password'},
          })
        }
      />
      <StackComponent.Screen
        name={Coupons_Route}
        component={Coupons}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {headerTitle: 'My Coupons'},
          })
        }
      />
      <StackComponent.Screen
        name={Address_Route}
        component={Address}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {headerTitle: 'Address'},
          })
        }
      />
      <StackComponent.Screen
        name={Notification_Preference_Route}
        component={NotificationPreference}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {headerTitle: 'Email & Notifications'},
          })
        }
      />
      <StackComponent.Screen
        name={Payment_Route}
        component={Payment}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {headerTitle: 'Payment'},
          })
        }
      />
      <StackComponent.Screen
        name={PaystackPayment_Route}
        component={PaystackPayment}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Payment',
              headerLeft: () => (
                <TouchableOpacity onPress={navigation.goBack}>
                  <AntDesign name="close" size={28} color={COLORS.primary} />
                </TouchableOpacity>
              ),
            },
          })
        }
      />
      <StackComponent.Screen
        name={Add_Delivery_Address}
        component={AddDeliveryAddress}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Delivery Address',
            },
          })
        }
      />
      <StackComponent.Screen
        name={Filter_Route}
        component={Filter}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: 'Filter',
            },
          })
        }
      />
      <StackComponent.Screen
        name={Items_Route}
        component={Items}
        options={({navigation, route}) =>
          screenOptions({
            navigation,
            route,
            options: {
              headerTitle: undefined,
              headerRight: () => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Ionicon
                      name="cart-outline"
                      size={27}
                      color={COLORS.dark}
                    />
                  </TouchableOpacity>
                </View>
              ),
            },
          })
        }
      />
      <StackComponent.Screen
        name={Search_Route}
        component={Search}
        options={{headerShown: false}}
      />

      {/* To be removed */}

      {/* <StackComponent.Screen name={'Socials'} component={Socials} /> */}
    </StackComponent.Navigator>
  );
};
export default StackNavigator;
