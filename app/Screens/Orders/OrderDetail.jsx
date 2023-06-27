import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderProductItem from '../../components/OrderItem/OrderProductItem';
import {Divider} from 'react-native-paper';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import CustomButton from '../../components/CustomButton';
import {useGetSingleOrderQuery} from '../../../store/services/order';
import Loading from '../../components/Loading/Loading';
import {format} from 'date-fns';
import ErrorOccurred from '../../components/ErrorOccurred/ErrorOccurred';

const OrderDetail = ({navigation, route}) => {
  const {orderId} = route.params;
  const {data, isLoading, isError, error} = useGetSingleOrderQuery(orderId);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loading size="large" />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ErrorOccurred />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[GlobalStyleSheet.container, {marginBottom: 10}]}>
          <Text style={[FONTS.fontLg, FONTS.fontBold]}>
            Estimated Delivery Time:
          </Text>
          <Text style={[FONTS.font]}>
            About {data?.shippingMethod?.duration} working days.
          </Text>
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
              <Text style={[FONTS.font, {textTransform: 'uppercase'}]}>
                {data?.shippingMethod?.title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Payment Method:</Text>
              <Text style={[FONTS.font]}>
                {data?.payment?.paymentMethod?.name}
              </Text>
            </View>
            {data?.createdAt && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text style={[FONTS.font]}>Order Time</Text>
                <Text style={[FONTS.font]}>
                  {format(new Date(data?.createdAt), 'MMM dd yyyy hh:mm a')}
                </Text>
              </View>
            )}

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
              <Text style={[FONTS.font]}>₦{data?.totalAmount}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Order Status</Text>
              <Text
                style={[
                  FONTS.font,
                  FONTS.fontBold,
                  {textTransform: 'uppercase'},
                ]}>
                {data?.status}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[GlobalStyleSheet.container, {backgroundColor: COLORS.light}]}>
          <Text style={[FONTS.fontLg, FONTS.fontBold]}>Products</Text>
          {data?.items?.map((item, index) => (
            <OrderProductItem key={index} item={item} />
          ))}
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
            <Text style={[FONTS.font, {textTransform: 'capitalize'}]}>
              {data?.shippingAddress[0]?.fullName}
            </Text>
            <Text style={[FONTS.font]}>
              {data?.shippingAddress[0]?.address}
            </Text>
            <Text style={[FONTS.font]}>{data?.shippingAddress[0]?.city}</Text>
            <Text style={[FONTS.font]}> {data?.shippingAddress[0]?.state}</Text>
            <Text style={[FONTS.font]}>
              {' '}
              {data?.shippingAddress[0]?.country}
            </Text>
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
              <Text style={[FONTS.font]}>₦{data?.totalAmount}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={[FONTS.font]}>Shippping fee:</Text>
              <Text style={[FONTS.font]}>₦{data?.shippingMethod?.charge}</Text>
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
              <Text style={[FONTS.font]}>
                ₦{data?.totalAmount + data?.shippingMethod?.charge}
              </Text>
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
