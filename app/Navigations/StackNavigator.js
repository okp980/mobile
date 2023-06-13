import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Onboarding/Splash';
import SignUp from '../Screens/Auth/SignUp';
import SignIn from '../Screens/Auth/SignIn';
import Products from '../Screens/Products/Products';
import DrawerNavigation from './DrawerNavigation';
import ProductDetail from '../Screens/Products/ProductDetail';
import Featured from '../Screens/Featured/Featured';
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
import BottomNavigation, {CustomHeader} from './BottomNavigation';
import {View, Text} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../constants/theme';
import {
  Add_Delivery_Address,
  Address_Route,
  Confirm_Order,
  Orders_Route,
  Payment_Route,
  PaystackPayment_Route,
  Sign_In,
  Sign_Up,
} from '../constants/routes';
import PaystackPayment from '../Screens/PaystackPayment';

const StackComponent = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <>
      <StackComponent.Navigator
        initialRouteName={'BottomNavigation'}
        detachInactiveScreens={true}
        screenOptions={{
          headerStyle: COLORS.backgroundColor,
          headerShown: false,
        }}>
        <StackComponent.Screen name={'Splash'} component={Splash} />
        <StackComponent.Screen
          name={Sign_Up}
          component={SignUp}
          options={{gestureDirection: 'vertical'}}
        />
        <StackComponent.Screen
          name={Sign_In}
          component={SignIn}
          options={{gestureDirection: 'vertical'}}
        />
        <StackComponent.Screen
          name="BottomNavigation"
          component={BottomNavigation}
        />
        {/* remove */}

        {/* check, kinda useful */}
        <StackComponent.Screen name={'Products'} component={Products} />
        <StackComponent.Screen
          name={'ProductDetail'}
          options={({navigation}) => ({
            headerShown: true,
            header: () => <CustomHeader showBackBtn navigation={navigation} />,
          })}
          component={ProductDetail}
        />
        <StackComponent.Screen name={'Featured'} component={Featured} />
        <StackComponent.Screen name={Orders_Route} component={Orders} />
        <StackComponent.Screen
          name={Confirm_Order}
          options={({navigation}) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <Ionicon
                  name="chevron-back"
                  size={30}
                  style={{marginRight: 15}}
                />
              </TouchableOpacity>
            ),
          })}
          component={ConfirmOrder}
        />
        <StackComponent.Screen
          name={'DeliveryTracking'}
          component={DeliveryTracking}
        />
        <StackComponent.Screen name={'Wishlist'} component={Wishlist} />
        <StackComponent.Screen name={'Profile'} component={Profile} />
        <StackComponent.Screen name={'EditProfile'} component={EditProfile} />
        <StackComponent.Screen name={'Coupons'} component={Coupons} />
        <StackComponent.Screen name={Address_Route} component={Address} />
        <StackComponent.Screen name={Payment_Route} component={Payment} />
        <StackComponent.Screen
          name={PaystackPayment_Route}
          component={PaystackPayment}
        />
        <StackComponent.Screen
          name={Add_Delivery_Address}
          component={AddDeliveryAddress}
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
    </>
  );
};
export default StackNavigator;
