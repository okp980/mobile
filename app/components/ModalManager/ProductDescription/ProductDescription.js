import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/theme';
import CustomMarkDown from '../../CustomMarkDown/CustomMarkDown';

const text = `
###Description

At Zuraya, we strive to ensure customer satisfaction with our products. If you are not completely satisfied with your purchase, we offer a straightforward return and refund policy. Here are the key points to understand:

**Key Features** 
    - 100% Copper Collections
    - Low Noise
    - Fuel Efficient
    - Max Kva: 2.75
    - Frequency Hz: 50
    - Noise Level (7m From Front Side)
    - DB(A): 69
    - Start Method:Electrical+Recoil
    - BatteryType: BS.7A

**Specification**
    SKU: HA992HA3I8OX^NAFAMZ
    Model: 2800ES
    Weight (kg):50
    Shop Type: Samsung
`;

const ProductDescription = () => {
  const {height} = useWindowDimensions();
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <ScrollView
        style={{
          maxHeight: height - 200,
          backgroundColor: COLORS.white,
        }}>
        <View style={{paddingHorizontal: 20, paddingBottom: 200}}>
          <CustomMarkDown>{text}</CustomMarkDown>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({});
