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
  useDeleteShippingAddressMutation,
  useGetUserShippingAddressQuery,
  useUpdateDefaultAddressMutation,
} from '../../../store/services/shippingAddress';
import {Add_Delivery_Address} from '../../constants/routes';
import Root from '../../components/Root';
import Loading from '../../components/Loading/Loading';
import ErrorOccurred from '../../components/ErrorOccurred/ErrorOccurred';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';

const Address = ({navigation}) => {
  const {data, isLoading, isError, isSuccess, error} =
    useGetUserShippingAddressQuery();
  const {handleOpenModal, handleCloseModal} = useModal();

  const [updateDefault] = useUpdateDefaultAddressMutation();
  const [deleteAddress] = useDeleteShippingAddressMutation();

  const handleDefault = async info => {
    if (info.default) return;
    try {
      handleOpenModal({type: FULL_SCREEN_LOADER});
      await updateDefault(info.id);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async id => {
    try {
      handleOpenModal({type: FULL_SCREEN_LOADER});
      await deleteAddress(id).unwrap();
      handleCloseModal();
    } catch (error) {}
  };

  if (isLoading) return <Loading />;

  if (isError) return <ErrorOccurred />;

  return (
    <Root>
      <ScrollView>
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
              style={{
                ...GlobalStyleSheet.container,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={{marginRight: 30}}
                onPress={() =>
                  navigation.navigate(Add_Delivery_Address, {
                    edit: true,
                    addressId: info?.id,
                  })
                }>
                <AntDesignIcon name="edit" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteAddress(info?.id)}>
                <AntDesignIcon name="delete" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </Root>
  );
};

export default Address;
