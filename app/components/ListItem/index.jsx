import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants/theme';
import {Divider} from 'react-native-paper';
import {GlobalStyleSheet} from '../../constants/StyleSheet';

const ListItem = ({item}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          ...GlobalStyleSheet.container,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.font}}>{item.name}</Text>
        </View>
        <View>
          <Ionicons
            name="chevron-forward"
            size={15}
            color={COLORS.borderColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
