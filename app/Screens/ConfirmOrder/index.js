import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  Payment_Route,
  Sign_In,
} from '../../constants/routes';
import {useLazyGetDefaultShippingAddressQuery} from '../../../store/services/shippingAddress';
import {useLazyGetShippingMethodsQuery} from '../../../store/services/shippingMethod';
import {useCreateOrderMutation} from '../../../store/services/order';
import Loading from '../../components/Loading/Loading';
import Root from '../../components/Root';

const ConfirmOrder = ({navigation}) => {
  const {token} = useAuth();
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [createOrder] = useCreateOrderMutation();

  const [
    getDefaultAddress,
    {
      data: address,
      isLoading: isLoadingAddress,
      isError: isAddressError,
      isSuccess: isAddressSuccess,
      error: addressError,
    },
  ] = useLazyGetDefaultShippingAddressQuery();

  const [getShippingMethods, {isLoading: isLoadingShippingMethods}] =
    useLazyGetShippingMethodsQuery({
      refetchOnFocus: true,
    });

  useEffect(() => {
    if (!token) {
      navigation.navigate(Sign_In, {from: Confirm_Order});
    } else {
      if (isAddressError) {
        navigation.navigate(Add_Delivery_Address, {from: Confirm_Order});
      }
    }
  }, [isAddressError, token, isLoadingAddress]);
  console.log('isErrorrrr', isAddressError);
  console.log('adressErorr ===>', addressError);

  useEffect(() => {
    getDefaultAddress();
    getShippingMethods()
      .unwrap()
      .then(data => {
        const newMethods = data.map((item, index) =>
          retrieveMethod(item, index === 0 ? true : false),
        );
        setMethods(newMethods);
        setSelectedMethod(newMethods[0]);
      });
  }, []);

  function retrieveMethod(methodData, selected = false) {
    return {
      id: methodData?.id,
      title: methodData?.title,
      description: methodData?.description,
      amount: methodData?.charge,
      selected,
    };
  }

  function handleSetDefaultShippingMethod(id) {
    const newMethods = methods.map(item =>
      item.id === id ? {...item, selected: true} : {...item, selected: false},
    );
    const selected = newMethods.find(item => item.selected);
    setSelectedMethod(selected);
    setMethods(newMethods);
  }

  async function handleConfirmOrder() {
    try {
      const data = await createOrder({
        shippingAddressId: address.id,
        shippingMethodId: selectedMethod.id,
      }).unwrap();
      navigation.navigate(Payment_Route, {orderId: data?.id});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoadingAddress || isLoadingShippingMethods) {
    return (
      <Root>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading size="large" />
        </View>
      </Root>
    );
  }
  return (
    <Root noPadding>
      <View style={{flex: 1}}>
        <ScrollView>
          <ShippingAddress address={address} />
          <ShippingMethodItem
            methods={methods}
            onSelectMethod={handleSetDefaultShippingMethod}
          />
          <Card style={{...GlobalStyleSheet.container}}>
            <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>Coupon</Text>
            <Text style={{...FONTS.font}}>
              If you have a coupon code, you can add it here.
            </Text>
            <CustomInput />
            <CustomButton title="Apply" />
          </Card>
          <OrderSummary shippingMethod={selectedMethod} />
        </ScrollView>
      </View>
      <View style={GlobalStyleSheet.container}>
        <CustomButton onPress={handleConfirmOrder} title={'Proceed'} />
      </View>
    </Root>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({});
