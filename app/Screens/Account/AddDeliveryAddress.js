import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import {Divider} from 'react-native-paper';
import ShippingMethodItem from '../../components/ShippingMethodItem';
import OrderSummary from '../../components/OrderSummary';

const AddDeliveryAddress = ({navigation}) => {
  const [defaultAddress, setAddress] = useState('Home');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Header titleLeft leftIcon={'back'} title={'Add delivery address'} />
      <View style={{flex: 1}}>
        <ScrollView>
          <Card style={GlobalStyleSheet.container}>
            <View
              style={{
                paddingBottom: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  ...FONTS.fontLg,
                  ...FONTS.fontBold,
                  color: COLORS.title,
                }}>
                Shipping Adress
              </Text>
            </View>
            <CustomInput label="First Name" placeholder="Enter First name" />
            <CustomInput label="Last Name" placeholder="Enter Last name" />
            <CustomInput
              label="Phone Number"
              placeholder="Enter Phone Number"
            />
            <CustomInput label="Email" placeholder="Enter Email Address" />
            <CustomInput label="Country" placeholder="Select Country" />
            <CustomInput label="State" placeholder="Select State" />
            <CustomInput label="City" placeholder="Select City" />
          </Card>
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

export default AddDeliveryAddress;
