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
import {
  useGetUserShippingAddressQuery,
  useUpdateDefaultAddressMutation,
} from '../../../store/services/shippingAddress';
import {Add_Delivery_Address} from '../../constants/routes';

const Address = ({navigation}) => {
  const {data, isLoading, isError, isSuccess, error} =
    useGetUserShippingAddressQuery();

  const [updateDefault] = useUpdateDefaultAddressMutation();

  const handleDefault = async info => {
    if (info.default) return;
    try {
      await updateDefault(info.id);
    } catch (error) {
      console.log(error);
    }
  };

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
        {data?.map((info, index) => (
          <Card key={index}>
            <TouchableOpacity onPress={() => handleDefault(info)}>
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
                        backgroundColor: info?.default
                          ? COLORS.dark
                          : COLORS.white,
                        borderRadius: 6,
                      }}
                    />
                  </View>
                </View>

                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <Text style={{...FONTS.font}}>{info?.fullName}</Text>
                  <Text style={{...FONTS.font}}>{info?.phoneNumber}</Text>
                  <Text style={{...FONTS.font}}>{info?.address}</Text>
                  <Text style={{...FONTS.font}}>{info?.city}</Text>
                  <Text style={{...FONTS.font}}>{info?.state}</Text>
                  <Text style={{...FONTS.font}}>{info?.country}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <Divider />
            <View
              style={{...GlobalStyleSheet.container, alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Add_Delivery_Address, {
                    edit: true,
                    addressId: info?.id,
                  })
                }>
                <AntDesignIcon name="edit" size={20} />
                <Text style={{...FONTS.font}}>Edit</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;
