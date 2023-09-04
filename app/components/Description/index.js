import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import useModal from '../../../hooks/useModal';
import {PRODUCT_DESCRIPTION} from '../../constants/modal';
import CustomMarkDown from '../CustomMarkDown/CustomMarkDown';

const Description = () => {
  const {handleOpenModal} = useModal();
  return (
    <TouchableOpacity
      onPress={() => handleOpenModal({type: PRODUCT_DESCRIPTION})}>
      <Card>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.fontLg, ...FONTS.fontBold, marginBottom: 2}}>
            Description
          </Text>
          <Ionicon name="chevron-forward" size={18} color={COLORS.text} />
        </View>
        <Divider />
        <View style={{padding: 20}}>
          <CustomMarkDown>
            **Key Features** - 100% Copper Collections - Low Noise - Fuel
            Efficient - Max Kva: 2.75 - Frequency Hz: 50 - Noise Level (7m From
            Front Side) - DB(A): 69 - Start Method:Electrical+Recoil -
            BatteryType: BS.7A
          </CustomMarkDown>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default Description;

const styles = StyleSheet.create({});
