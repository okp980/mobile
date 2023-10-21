import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../../constants/theme';
import {filterSelectAttr} from '../../../../helpers/util';

const Attributes = ({attributes, onSelectAttributes}) => {
  console.log('attributes ===<>=== ', attributes);

  return (
    <View>
      {Object.keys(attributes).map((key, keyIndex) => (
        <View key={keyIndex} style={{marginBottom: 10}}>
          <Text style={{...FONTS.fontLg, ...FONTS.fontBold, marginBottom: 10}}>
            {key}
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {attributes[key].map((attr, attrIndex) => (
              <TouchableOpacity
                onPress={() => onSelectAttributes({[key]: attr})}
                key={attrIndex}
                style={{
                  marginLeft: attrIndex === 0 ? 0 : 10,
                  borderWidth: 1,
                  borderColor: COLORS.borderColor,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  height:
                    key.toLowerCase() === 'colour' ||
                    key.toLowerCase() === 'color'
                      ? 25
                      : undefined,
                  width:
                    key.toLowerCase() === 'colour' ||
                    key.toLowerCase() === 'color'
                      ? 25
                      : undefined,
                  backgroundColor:
                    key.toLowerCase() === 'colour' ||
                    key.toLowerCase() === 'color'
                      ? attr.value.toLowerCase()
                      : 'transparent',
                  borderRadius:
                    key.toLowerCase() === 'colour' ||
                    key.toLowerCase() === 'color'
                      ? 25 / 2
                      : undefined,
                }}>
                {key.toLowerCase() !== 'colour' && (
                  <Text style={{...FONTS.font}}>{attr.value}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Attributes;

const styles = StyleSheet.create({});
