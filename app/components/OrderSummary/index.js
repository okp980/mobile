import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Card from '../Card';
import {Divider} from 'react-native-paper';
import {useGetCartQuery} from '../../../store/services/cart';
import {getPrice} from '../../../helpers/util';

const OrderSummary = ({shippingMethod}) => {
  const {data, isLoading, isSuccess} = useGetCartQuery();
  const total = parseFloat(
    Number(data?.data?.total) + Number(shippingMethod?.amount),
  ).toFixed(2);

  return (
    <>
      <Card style={{...GlobalStyleSheet.container, backgroundColor: '#E6E6EA'}}>
        <Text style={{...FONTS.fontLg, ...FONTS.fontBold, color: COLORS.title}}>
          Order Summary
        </Text>
        <Divider style={{marginVertical: 10}} />

        {data?.data?.products?.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 3,
            }}
            key={index}>
            <View
              style={{height: 80, width: 60, backgroundColor: COLORS.dark}}
            />
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: COLORS.dark,
                  marginBottom: 5,
                }}>
                {item?.product?.name} (x{item?.count})
              </Text>
              <Text style={{...FONTS.fontXs}}>
                {item?.product?.sub_category?.name}
              </Text>
            </View>
            <View style={{paddingHorizontal: 5}}>
              <Text style={{...FONTS.fontLg, ...FONTS.fontBold}}>
                {getPrice(item?.price)}
              </Text>
            </View>
          </View>
        ))}
      </Card>
      <Card style={{...GlobalStyleSheet.container, backgroundColor: '#E6E6EA'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <Text style={{...FONTS.font}}>Subtotal:</Text>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>
            {getPrice(data?.data?.total)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <Text style={{...FONTS.font}}>Shipping fee:</Text>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>
            {getPrice(shippingMethod?.amount)}
          </Text>
        </View>

        {/* Discount - activate later */}

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={{...FONTS.font}}>Discount:</Text>
            <Text style={{...FONTS.fontXs}}>(Coupon Code:[she30])</Text>
          </View>
          <Text style={{...FONTS.font, ...FONTS.fontBold}}>$22.00</Text>
        </View> */}
        <Divider style={{marginVertical: 10}} />
        {/* total */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}>
          <View>
            <Text style={{...FONTS.h4, ...FONTS.fontBold}}>TOTAL</Text>
          </View>
          <Text style={{...FONTS.h5, ...FONTS.fontBold}}>
            {getPrice(total)}
          </Text>
        </View>
      </Card>
    </>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({});
