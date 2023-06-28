import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../Card';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Description = () => {
  return (
    <Card>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{...FONTS.fontLg, color: COLORS.dark, marginBottom: 2}}>
          Description
        </Text>
        <AntIcon name="right" size={20} />
      </View>
      <Divider />
      <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
        <Text style={{...FONTS.font, color: COLORS.text}}>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et
        </Text>
      </View>
    </Card>
  );
};

export default Description;

const styles = StyleSheet.create({});
