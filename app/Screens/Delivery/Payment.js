import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/theme';
import CustomButton from '../../components/CustomButton';
import PaymentMethod from '../../components/PaymentMethod';
import {useLazyGetPaymentMethodQuery} from '../../../store/services/paymentMethod';
import {useOrderPaymentMutation} from '../../../store/services/order';
import {PaystackPayment_Route} from '../../constants/routes';
import Root from '../../components/Root';
//import DropShadow from 'react-native-drop-shadow';

const Payment = ({navigation, route}) => {
  const orderId = route?.params?.orderId;
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [methods, setMethods] = useState([]);
  const [getPaymentMethods] = useLazyGetPaymentMethodQuery();
  console.log(orderId);

  const [makePayment] = useOrderPaymentMutation();

  useEffect(() => {
    getPaymentMethods()
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
      name: methodData?.name,
      selected,
    };
  }

  const handlePayment = async () => {
    try {
      const data = await makePayment({
        id: orderId,
        data: {paymentMethod: selectedMethod?.id},
      }).unwrap();
      console.log('data ooo', data);
      const checkoutUrl = data?.authorization_url;
      navigation.navigate(PaystackPayment_Route, {checkoutUrl});
    } catch (error) {
      console.log(error);
    }
  };

  function handleSetDefaultPaymentMethod(id) {
    const newMethods = methods.map(item =>
      item.id === id ? {...item, selected: true} : {...item, selected: false},
    );
    const selected = newMethods.find(item => item.selected);
    setSelectedMethod(selected);
    setMethods(newMethods);
  }

  return (
    <Root>
      <View>
        <PaymentMethod
          methods={methods}
          onSelectMethod={handleSetDefaultPaymentMethod}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <CustomButton
              onPress={handlePayment}
              title={'Proceed to Pay'}
              color={COLORS.primary}
            />
          </View>
        </View>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({});

export default Payment;
