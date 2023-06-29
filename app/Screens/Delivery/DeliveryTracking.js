import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLORS, FONTS, IMAGES} from '../../constants/theme';
import pic1 from '../../assets/images/product/pic1.jpg';
import Header from '../../layout/Header';
import CheckoutItem from '../../components/CheckoutItem';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import DeliveryMap from './DeliveryMap';
import Root from '../../components/Root';

const DeliveryTracking = () => {
  return (
    <Root noPadding>
      <ScrollView>
        <View>
          <View style={GlobalStyleSheet.container}>
            <Text style={[FONTS.h1, {marginVertical: 20}]}>Track Order</Text>
          </View>
          <View style={styles.header}>
            <Text
              style={[
                FONTS.fontLg,
                {color: COLORS.white, textAlign: 'center'},
              ]}>
              Order code: #04451255
            </Text>
            <Text
              style={[FONTS.font, {color: COLORS.white, textAlign: 'center'}]}>
              2 Items ₦20,000.00
            </Text>
          </View>
          <View style={styles.track}>
            <View>
              <View style={styles.delCircle} />
              <View style={styles.delInfo}>
                <Text
                  style={{...FONTS.h5, ...FONTS.fontBold, color: COLORS.dark}}>
                  Order Placed
                </Text>
                <Text style={{...FONTS.fontXs, marginBottom: 15}}>
                  Monday June 20th, 2020 12:25 AM
                </Text>
                <Text style={{...FONTS.font, color: COLORS.title}}>
                  We have received your order
                </Text>
              </View>
            </View>
            <View>
              <View
                style={[
                  styles.delCircle,
                  {
                    backgroundColor: COLORS.borderColor,
                  },
                ]}
              />
              <View style={[styles.delInfo, {borderColor: COLORS.borderColor}]}>
                <Text
                  style={{...FONTS.h5, ...FONTS.fontBold, color: COLORS.dark}}>
                  Order Confirmed
                </Text>
                <Text style={{...FONTS.fontXs, marginBottom: 15}}>
                  Monday June 20th, 2020 12:25 AM
                </Text>
                <Text style={{...FONTS.font, color: COLORS.title}}>
                  Your order has been confirmed
                </Text>
              </View>
            </View>
            <View>
              <View
                style={[
                  styles.delCircle,
                  {backgroundColor: COLORS.borderColor},
                ]}
              />
              <View style={[styles.delInfo, {borderColor: COLORS.borderColor}]}>
                <Text
                  style={{...FONTS.h5, ...FONTS.fontBold, color: COLORS.dark}}>
                  Order Processed
                </Text>
                <Text style={{...FONTS.fontXs, marginBottom: 15}}>
                  Monday June 20th, 2020 12:25 AM
                </Text>
                <Text style={{...FONTS.font, color: COLORS.title}}>
                  Your order has been processed
                </Text>
              </View>
            </View>
            <View>
              <View
                style={[
                  styles.delCircle,
                  {backgroundColor: COLORS.borderColor},
                ]}
              />
              <View style={[styles.delInfo, {borderColor: 'transparent'}]}>
                <Text
                  style={{...FONTS.h5, ...FONTS.fontBold, color: COLORS.dark}}>
                  Ready to Pickup
                </Text>
                <Text style={{...FONTS.fontXs, marginBottom: 15}}>
                  Monday June 20th, 2020 12:25 AM
                </Text>
                <Text style={{...FONTS.font, color: COLORS.title}}>
                  Your order is ready to pick up
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Root>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.dark,
    paddingVertical: 30,
  },
  track: {marginVertical: 40, ...GlobalStyleSheet.container},
  delCircle: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    backgroundColor: COLORS.dark,
    // borderWidth: 3,
    // borderColor: COLORS.white,
    position: 'absolute',
    top: 0,
    left: 8,
    zIndex: 2,
  },
  delInfo: {
    paddingLeft: 30,
    marginLeft: 15,
    borderLeftWidth: 2,
    borderColor: COLORS.dark,
    paddingBottom: 30,
    paddingRight: 10,
    height: 120,
  },
});

export default DeliveryTracking;
