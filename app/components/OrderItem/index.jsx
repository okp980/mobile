import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS} from '../../constants/theme';
import OrderProductItem from './OrderProductItem';
import {Divider} from 'react-native-paper';
import CustomButton from '../CustomButton';
import {useNavigation} from '@react-navigation/native';
import {
  DeliveryTracking_Route,
  OrderDetail_Route,
} from '../../constants/routes';

const OrderItem = () => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.topOrder}>
            <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>
              ORDER #352602
            </Text>
            <View style={styles.delivered}>
              <View style={styles.dot} />
              <Text style={{...FONTS.fontXs}}>Delivered</Text>
            </View>
          </View>
          <View>
            <Text style={{...FONTS.font}}>23 May, 2023</Text>
            <Text style={{...FONTS.font}}>05:23pm</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setShow(prev => !prev)}>
            <Text
              style={{
                ...FONTS.font,
                textAlign: 'center',
                textDecorationLine: 'underline',
                color: COLORS.primary,
              }}>
              More Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <View
          style={{
            ...styles.container,
            backgroundColor: COLORS.light,
          }}>
          <OrderProductItem />
          <OrderProductItem />
          <View style={styles.cost}>
            <View style={styles.costItem}>
              <View>
                <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>
                  Shipping fee
                </Text>
              </View>
              <View>
                <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>₦3,500</Text>
              </View>
            </View>
            <Divider />
            <View style={styles.costItem}>
              <View>
                <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>Total</Text>
              </View>
              <View>
                <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>
                  ₦30,500
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cta}>
            <CustomButton
              onPress={() =>
                navigation.navigate(OrderDetail_Route, {orderId: ''})
              }
              title="View Order"
              customStyles={{flex: 1, backgroundColor: COLORS.dark}}
            />
            <View style={{width: 10}} />
            <CustomButton
              onPress={() =>
                navigation.navigate(DeliveryTracking_Route, {trackingId: ''})
              }
              title="Track Order"
              customStyles={{flex: 1, backgroundColor: COLORS.dark}}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.dark,
    marginRight: 5,
  },
  delivered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cost: {
    marginVertical: 20,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cta: {
    flexDirection: 'row',
  },
});
