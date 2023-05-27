import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import Card from '../../components/Card';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';

const Address = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Header titleLeft leftIcon={'back'} title={'Address'} />
      <ScrollView style={GlobalStyleSheet.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDeliveryAddress')}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
          }}>
          <Text
            style={{...FONTS.font, ...FONTS.fontBold, color: COLORS.primary}}>
            +Add New Address
          </Text>
        </TouchableOpacity>
        <Card>
          <View
            style={{
              ...GlobalStyleSheet.container,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <View>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 10,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: 'black',
                    borderRadius: 6,
                  }}
                />
              </View>
            </View>
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <Text style={{...FONTS.font}}>Emmanuel Okpunor</Text>
              <Text style={{...FONTS.font}}>08134271449</Text>
              <Text style={{...FONTS.font}}>
                2 bukola alomaja avenue, glory land estate, inside destiny homes
                estate, Abijo
              </Text>
              <Text style={{...FONTS.font}}>Ajah</Text>
              <Text style={{...FONTS.font}}>Lagos</Text>
            </View>
          </View>
          <Divider />
          <View style={{...GlobalStyleSheet.container, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDeliveryAddress')}>
              <AntDesignIcon name="edit" size={20} />
              <Text style={{...FONTS.font}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;
