import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderProductItem from '../../components/OrderItem/OrderProductItem';
import {Divider} from 'react-native-paper';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import CustomButton from '../../components/CustomButton';

const OrderDetail = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[GlobalStyleSheet.container, {marginBottom: 10}]}>
          <Text style={[FONTS.fontLg, FONTS.fontBold]}>
            Estimated Delivery Time:
          </Text>
          <Text style={[FONTS.font]}>About Jul 01 2023 - Jul 04 2023</Text>
        </View>
        <View>
          <View
            style={[
              GlobalStyleSheet.container,
              {backgroundColor: COLORS.light},
            ]}>
            <Text style={[FONTS.fontLg, FONTS.fontBold]}>
              Order Information
            </Text>
          </View>

          <View style={[GlobalStyleSheet.container]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Shipping Method</Text>
              <Text style={[FONTS.font]}>HOME DELIVERY</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Payment Method:</Text>
              <Text style={[FONTS.font]}>Online Payment</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Order Time</Text>
              <Text style={[FONTS.font]}>Jun 12 2023 00:17:40</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Order Number</Text>
              <Text style={[FONTS.font]}>GSHN7Q24W00MYUE</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Order Total</Text>
              <Text style={[FONTS.font]}>₦12,000</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Order Status</Text>
              <Text style={[FONTS.font]}>Shipped</Text>
            </View>
          </View>
        </View>

        <View
          style={[GlobalStyleSheet.container, {backgroundColor: COLORS.light}]}>
          <Text style={[FONTS.fontLg, FONTS.fontBold]}>Products</Text>
          <OrderProductItem />
        </View>
        <View>
          <View
            style={[
              GlobalStyleSheet.container,
              {backgroundColor: COLORS.light, marginTop: 20},
            ]}>
            <Text style={[FONTS.font, FONTS.fontBold]}>Shipping Address</Text>
          </View>
          <View style={[GlobalStyleSheet.container]}>
            <Text style={[FONTS.font]}>Emmanuel Okpunor</Text>
            <Text style={[FONTS.font]}>
              2 bukola alomaja avenue, glory land estate
            </Text>
            <Text style={[FONTS.font]}>Ajah</Text>
            <Text style={[FONTS.font]}>Lagos</Text>
            <Text style={[FONTS.font]}>Nigeria</Text>
          </View>
        </View>
        <View>
          <View
            style={[
              GlobalStyleSheet.container,
              {backgroundColor: COLORS.light, marginTop: 20},
            ]}>
            <Text style={[FONTS.fontLg, FONTS.fontBold]}>Payment Detail</Text>
          </View>
          <View style={[GlobalStyleSheet.container]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Subtotal:</Text>
              <Text style={[FONTS.font]}>₦12,000</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Shippping fee:</Text>
              <Text style={[FONTS.font]}>₦2,000</Text>
            </View>
            <Divider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={[FONTS.fontLg, FONTS.fontBold]}>TOTAL</Text>
              <Text style={[FONTS.font]}>₦14,000</Text>
            </View>
          </View>
        </View>
        <View style={GlobalStyleSheet.container}>
          <CustomButton
            title="Cancel Order"
            customStyles={{backgroundColor: COLORS.dark}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({});
