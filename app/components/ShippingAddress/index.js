import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {COLORS, FONTS} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {Divider} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ShippingAddress = ({address}) => {
  const navigation = useNavigation();
  return (
    <Card>
      <View
        style={{
          ...GlobalStyleSheet.container,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{...FONTS.fontLg, ...FONTS.fontBold, color: COLORS.title}}>
          ShippingAddress
        </Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Address')}>
            <Text
              style={{
                ...FONTS.fontXs,
                ...FONTS.fontBold,
                color: COLORS.primary,
              }}>
              Change Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <View
        style={{
          ...GlobalStyleSheet.container,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={{...FONTS.font}}>{address?.address},</Text>
          <Text style={{...FONTS.font}}>{address?.city},</Text>
          <Text style={{...FONTS.font}}>{address?.state}.</Text>
          <Text style={{...FONTS.font}}>{address?.country}.</Text>
        </View>
      </View>
    </Card>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({});
