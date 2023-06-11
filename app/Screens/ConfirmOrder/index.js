import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ShippingMethodItem from '../../components/ShippingMethodItem';
import OrderSummary from '../../components/OrderSummary';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import ShippingAddress from '../../components/ShippingAddress';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import {FONTS} from '../../constants/theme';
import useAuth from '../../../hooks/useAuth';
import {
  Add_Delivery_Address,
  Confirm_Order,
  Sign_In,
} from '../../constants/routes';
import {useGetDefaultShippingAddressQuery} from '../../../store/services/shippingAddress';

const ConfirmOrder = ({navigation}) => {
  const {token} = useAuth();

  const {
    data: address,
    isError: isAddressError,
    isSuccess: isAddressSuccess,
    error: addressError,
  } = useGetDefaultShippingAddressQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (!token) {
      navigation.navigate(Sign_In, {from: Confirm_Order});
    }
  }, [token]);
  useEffect(() => {
    if (isAddressError && token) {
      navigation.navigate(Add_Delivery_Address, {from: Confirm_Order});
    }
  }, [isAddressError, isAddressSuccess, token]);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Header titleLeft leftIcon={'back'} title={'Confirm Order'} /> */}
      <View style={{flex: 1}}>
        <ScrollView>
          <ShippingAddress address={address?.data} />
          <ShippingMethodItem />
          <Card style={{...GlobalStyleSheet.container}}>
            <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>Coupon</Text>
            <Text style={{...FONTS.font}}>
              If you have a coupon code, you can add it here.
            </Text>
            <CustomInput />
            <CustomButton title="Apply" />
          </Card>
          <OrderSummary />
        </ScrollView>
      </View>
      <View style={GlobalStyleSheet.container}>
        <CustomButton
          onPress={() => navigation.navigate('Payment')}
          title={'Proceed'}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
