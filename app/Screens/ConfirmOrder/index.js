import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShippingMethodItem from '../../components/ShippingMethodItem';
import OrderSummary from '../../components/OrderSummary';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import ShippingAddress from '../../components/ShippingAddress';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import {COLORS, FONTS} from '../../constants/theme';
import useAuth from '../../../hooks/useAuth';
import {
  Add_Delivery_Address,
  Confirm_Order,
  Payment_Route,
  PaystackPayment_Route,
  Sign_In,
} from '../../constants/routes';
import {
  useGetDefaultShippingAddressQuery,
  useLazyGetDefaultShippingAddressQuery,
} from '../../../store/services/shippingAddress';
import {useLazyGetShippingMethodsQuery} from '../../../store/services/shippingMethod';
import {useCreateOrderMutation} from '../../../store/services/order';
import Loading from '../../components/Loading/Loading';
import Root from '../../components/Root';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';
import Snackbar from 'react-native-snackbar';
import {useLazyGetPaymentMethodQuery} from '../../../store/services/paymentMethod';
import PaymentMethod from '../../components/PaymentMethod';

const ConfirmOrder = ({navigation}) => {
  const {token} = useAuth();
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [createOrder] = useCreateOrderMutation();
  const {handleOpenModal, handleCloseModal} = useModal();

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

  const [getPaymentMethods] = useLazyGetPaymentMethodQuery();

  const [getShippingMethods, {isLoading: isLoadingShippingMethods}] =
    useLazyGetShippingMethodsQuery();

  useEffect(() => {
    if (!token) {
      navigation.replace(Sign_In, {from: Confirm_Order});
    } else {
      // shipping methods
      getShippingMethods()
        .unwrap()
        .then(data => {
          const newMethods = data.map((item, index) =>
            retrieveMethod(item, index === 0 ? true : false),
          );
          setMethods(newMethods);
          setSelectedMethod(newMethods[0]);
        });

      // default shipping address
      getDefaultAddress()
        .unwrap()
        .catch(err => {
          navigation.navigate(Add_Delivery_Address, {from: Confirm_Order});
        });

      // payment methods

      getPaymentMethods()
        .unwrap()
        .then(data => {
          const newMethods = data.map((item, index) =>
            retrievePaymentMethod(item, index === 0 ? true : false),
          );
          setPaymentMethods(newMethods);
          setSelectedPaymentMethod(newMethods[0]);
        });
    }
  }, [token]);

  function retrievePaymentMethod(methodData, selected = false) {
    return {
      id: methodData?.id,
      name: methodData?.name,
      selected,
    };
  }

  // useEffect(() => {
  //   // Subscribe for the focus Listener
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (isAddressError) {
  //       navigation.navigate(Add_Delivery_Address, {from: Confirm_Order});
  //     }
  //   });

  //   return () => {
  //     // Unsubscribe for the focus Listener
  //     unsubscribe;
  //   };
  // }, [isAddressError]);

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

  function handleSetDefaultPaymentMethod(id) {
    const newMethods = paymentMethods.map(item =>
      item.id === id ? {...item, selected: true} : {...item, selected: false},
    );
    const selected = newMethods.find(item => item.selected);
    setSelectedPaymentMethod(selected);
    setPaymentMethods(newMethods);
  }

  async function handleConfirmOrder() {
    handleOpenModal({type: FULL_SCREEN_LOADER});
    try {
      const data = await createOrder({
        shippingAddressId: address.id,
        shippingMethodId: selectedMethod.id,
        paymentMethodId: selectedPaymentMethod.id,
      }).unwrap();
      console.log('date from order', data);
      const checkoutUrl = data?.authorization_url;
      const orderId = data?.order_id;
      // navigation.navigate(Payment_Route, {orderId: data?.id});
      navigation.navigate(PaystackPayment_Route, {checkoutUrl, orderId});
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
      console.log(error);
      Snackbar.show({
        text: error?.data?.error || 'Error while processing order',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: COLORS.danger,
        textColor: COLORS.text,
      });
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
            <PaymentMethod
              methods={paymentMethods}
              onSelectMethod={handleSetDefaultPaymentMethod}
            />
          </Card>
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
