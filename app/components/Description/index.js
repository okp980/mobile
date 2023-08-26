import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Description = () => {
  return (
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
        <Text style={{...FONTS.font}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et
        </Text>
      </View>
    </Card>
  );
};

export default Description;

const styles = StyleSheet.create({});
