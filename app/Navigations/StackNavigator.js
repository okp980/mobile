import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../Screens/Auth/SignUp';
import SignIn from '../Screens/Auth/SignIn';
import DrawerNavigation from './DrawerNavigation';
import ProductDetail from '../Screens/Products/ProductDetail';
import Orders from '../Screens/Orders/Orders';
import DeliveryTracking from '../Screens/Delivery/DeliveryTracking';
import Wishlist from '../Screens/Wishlist/Wishlist';
import Profile from '../Screens/Account/Profile';
import EditProfile from '../Screens/Account/EditProfile';
import Coupons from '../Screens/Account/Coupons';
import Address from '../Screens/Account/Address';
import AddDeliveryAddress from '../Screens/Account/AddDeliveryAddress';
import Filter from '../Screens/Filter/Filter';
import Items from '../Screens/Items/Items';

import Search from '../Screens/Search/Search';
import Payment from '../Screens/Delivery/Payment';
import Components from '../Screens/Components/Components';
import AccordionScreen from '../Screens/Components/Accordion';
import ActionSheet from '../Screens/Components/ActionSheet';
import Buttons from '../Screens/Components/Buttons';
import Inputs from '../Screens/Components/Inputs';
import ActionModals from '../Screens/Components/ActionModals';
import Charts from '../Screens/Components/Charts';
import Chips from '../Screens/Components/Chips';
import CollapseElements from '../Screens/Components/CollapseElements';
import DividerElements from '../Screens/Components/DividerElements';
import FileUploads from '../Screens/Components/FileUploads';
import Headers from '../Screens/Components/Headers';
import Footers from '../Screens/Components/Footers';
import TabStyle1 from '../components/Footers/FooterStyle1';
import TabStyle2 from '../components/Footers/FooterStyle2';
import TabStyle3 from '../components/Footers/FooterStyle3';
import TabStyle4 from '../components/Footers/FooterStyle4';
import ListScreen from '../Screens/Components/Lists';
import Paginations from '../Screens/Components/Paginations';
import Pricings from '../Screens/Components/Pricings';
import Snackbars from '../Screens/Components/Snakbars';
import Socials from '../Screens/Components/Socials';
import SwipeableScreen from '../Screens/Components/Swipeable';
import Tabs from '../Screens/Components/Tabs';
import Tables from '../Screens/Components/Tables';
import Toggles from '../Screens/Components/Toggles';
import ConfirmOrder from '../Screens/ConfirmOrder';
import {View, Text} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Add_Delivery_Address,
  Address_Route,
  BottomNavigation_Route,
  Confirm_Order,
  Coupons_Route,
  DeliveryTracking_Route,
  EditProfile_Route,
  OrderDetail_Route,
  Orders_Route,
  Payment_Route,
  PaystackPayment_Route,
  ProductDetail_Route,
  Profile_Route,
  Settings_Route,
  Sign_In,
  Sign_Up,
  Wishlist_Route,
} from '../constants/routes';
import PaystackPayment from '../Screens/PaystackPayment';
import OrderDetail from '../Screens/Orders/OrderDetail';
import Settings from '../Screens/Account/Settings';
import {screenOptions} from './Header/screenOptions';
import {CustomHeader} from './Header/CustomHeader';
import BottomNavigation from './BottomNavigation';

const StackComponent = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <StackComponent.Navigator
      initialRouteName={Add_Delivery_Address}
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
            options: {gestureDirection: 'vertical'},
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
            options: {gestureDirection: 'vertical'},
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
            options: {headerTitle: 'Edit Profile'},
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
                <AntDesign name="close" size={28} color={COLORS.primary} />
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
      <StackComponent.Screen name={'Filter'} component={Filter} />
      <StackComponent.Screen
        name={'Items'}
        component={Items}
        options={({route, navigation}) => ({
          headerShown: true,
          headerStyle: COLORS.backgroundColor,
          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={navigation.goBack}>
                <Ionicon
                  name="chevron-back"
                  size={30}
                  style={{marginRight: 15}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Ionicon name="search" size={25} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Ionicon name="cart-outline" size={25} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <StackComponent.Screen name={'Search'} component={Search} />

      {/* To be removed */}
      <StackComponent.Screen name={'Components'} component={Components} />
      <StackComponent.Screen name={'Accordion'} component={AccordionScreen} />
      <StackComponent.Screen name={'ActionSheet'} component={ActionSheet} />
      <StackComponent.Screen name={'ActionModals'} component={ActionModals} />
      <StackComponent.Screen name={'Buttons'} component={Buttons} />
      <StackComponent.Screen name={'Charts'} component={Charts} />
      <StackComponent.Screen name={'Chips'} component={Chips} />
      <StackComponent.Screen
        name={'CollapseElements'}
        component={CollapseElements}
      />
      <StackComponent.Screen
        name={'DividerElements'}
        component={DividerElements}
      />

      <StackComponent.Screen name={'FileUploads'} component={FileUploads} />
      <StackComponent.Screen name={'Inputs'} component={Inputs} />
      <StackComponent.Screen name={'Headers'} component={Headers} />
      <StackComponent.Screen name={'Footers'} component={Footers} />
      <StackComponent.Screen name={'TabStyle1'} component={TabStyle1} />
      <StackComponent.Screen name={'TabStyle2'} component={TabStyle2} />
      <StackComponent.Screen name={'TabStyle3'} component={TabStyle3} />
      <StackComponent.Screen name={'TabStyle4'} component={TabStyle4} />
      <StackComponent.Screen name={'lists'} component={ListScreen} />
      <StackComponent.Screen name={'Paginations'} component={Paginations} />
      <StackComponent.Screen name={'Pricings'} component={Pricings} />
      <StackComponent.Screen name={'Snackbars'} component={Snackbars} />
      <StackComponent.Screen name={'Socials'} component={Socials} />
      <StackComponent.Screen name={'Swipeable'} component={SwipeableScreen} />
      <StackComponent.Screen name={'Tabs'} component={Tabs} />
      <StackComponent.Screen name={'Tables'} component={Tables} />
      <StackComponent.Screen name={'Toggles'} component={Toggles} />
    </StackComponent.Navigator>
  );
};
export default StackNavigator;
