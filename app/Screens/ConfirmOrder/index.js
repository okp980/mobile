import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Header} from '@react-navigation/stack';
import ShippingMethodItem from '../../components/ShippingMethodItem';
import OrderSummary from '../../components/OrderSummary';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import ShippingAddress from '../../components/ShippingAddress';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import {FONTS} from '../../constants/theme';
import useAuth from '../../../hooks/useAuth';
import {Confirm_Order, Sign_In} from '../../constants/routes';

const ConfirmOrder = ({navigation}) => {
  const {token} = useAuth();
  useEffect(() => {
    if (!token) {
      navigation.navigate(Sign_In, {from: Confirm_Order});
    }
  }, [token]);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Header titleLeft leftIcon={'back'} title={'Confirm Order'} /> */}
      <View style={{flex: 1}}>
        <ScrollView>
          <ShippingAddress />
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
