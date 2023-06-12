import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import Collapsible from 'react-native-collapsible';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
//import Button from '../../../components/Button/Button';
//import CustomInput from '../../../components/Input/CustomInput';
import discount from '../../assets/images/icons/discount.png';
import cash from '../../assets/images/icons/cash.png';
import card from '../../assets/images/icons/card.png';
import pay from '../../assets/images/icons/pay.png';
import wallet from '../../assets/images/icons/wallet.png';
import bank from '../../assets/images/icons/bank.png';
import personal from '../../assets/images/icons/personal.png';
import gift from '../../assets/images/icons/gift.png';
import phonepe from '../../assets/images/icons/phonepe.png';
import CustomButton from '../../components/CustomButton';
import Card from '../../components/Card';
import PaymentMethod from '../../components/PaymentMethod';
import {useLazyGetPaymentMethodQuery} from '../../../store/services/paymentMethod';
import {useOrderPaymentMutation} from '../../../store/services/order';
import {PaystackPayment_Route} from '../../constants/routes';
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
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
        <Header titleLeft leftIcon={'back'} title={'Payment'} />

        <View>
          <PaymentMethod
            methods={methods}
            onSelectMethod={handleSetDefaultPaymentMethod}
          />

          <View style={[GlobalStyleSheet.container]}>
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
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  stepItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIcon: {
    height: 30,
    width: 30,
    borderRadius: 35,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary2,
  },
  list: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  listImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },
  listTitle: {
    ...FONTS.font,
    ...FONTS.fontBold,
    flex: 1,
  },
  detailList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  payList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  listRadio: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listRadioCircle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  payImg: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  payMedia: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 40,
    marginRight: 15,
  },
});

export default Payment;
