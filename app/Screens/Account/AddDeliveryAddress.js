import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomInput';
import {KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import {useRef} from 'react';
import {
  useCreateShippingAddressMutation,
  useLazyGetSingleShippingAddressQuery,
  useUpdateSingleAddressMutation,
} from '../../../store/services/shippingAddress';
import {Address_Route} from '../../constants/routes';
import {useEffect} from 'react';
import Root from '../../components/Root';

const addressValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  country: '',
  state: '',
  city: '',
  address: '',
};

const AddDeliveryAddress = ({navigation, route}) => {
  const from = route?.params?.from;
  const edit = route?.params?.edit;
  const addressId = route?.params?.addressId;
  const [createAddress] = useCreateShippingAddressMutation();
  const [getAddress] = useLazyGetSingleShippingAddressQuery();
  const [updateAddress] = useUpdateSingleAddressMutation();
  const [initialValues, setInitialValues] = useState(addressValues);
  const formRef = useRef();

  useEffect(() => {
    if (edit && addressId) {
      getAddress(addressId)
        .unwrap()
        .then(data => {
          setInitialValues(getAddressInfo(data));
        });
    }
  }, []);

  function getAddressInfo(data) {
    return {
      firstName: data?.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      email: data?.email,
      country: data?.country,
      state: data?.state,
      city: data?.city,
      address: data?.address,
    };
  }

  const submit = async values => {
    try {
      let res;
      if (edit) {
        res = await updateAddress({id: addressId, values}).unwrap();
      } else {
        res = await createAddress(values).unwrap();
      }
      from ? navigation.navigate(from) : navigation.navigate(Address_Route);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBtn = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  return (
    <Root>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View>
            <View
              style={{
                paddingBottom: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  ...FONTS.fontLg,
                  ...FONTS.fontBold,
                  color: COLORS.title,
                }}>
                Shipping Address
              </Text>
            </View>
            <Formik
              initialValues={initialValues}
              onSubmit={submit}
              innerRef={formRef}
              enableReinitialize>
              {({handleChange, handleSubmit, values}) => (
                <>
                  <CustomInput
                    label="First Name"
                    placeholder="Enter First name"
                    onChangeText={handleChange('firstName')}
                    value={values.firstName}
                  />
                  <CustomInput
                    label="Last Name"
                    placeholder="Enter Last name"
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                  />
                  <CustomInput
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    onChangeText={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                  />
                  <CustomInput
                    label="Email"
                    placeholder="Enter Email Address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  <CustomInput
                    label="Country"
                    placeholder="Select Country"
                    onChangeText={handleChange('country')}
                    value={values.country}
                  />
                  <CustomInput
                    label="State"
                    placeholder="Select State"
                    onChangeText={handleChange('state')}
                    value={values.state}
                  />
                  <CustomInput
                    label="City"
                    placeholder="Select City"
                    onChangeText={handleChange('city')}
                    value={values.city}
                  />
                  <CustomInput
                    label="Address"
                    placeholder="Enter Address"
                    onChangeText={handleChange('address')}
                    value={values.address}
                  />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={GlobalStyleSheet.container}>
        <CustomButton onPress={handleSubmitBtn} title={'Save Address'} />
      </View>
    </Root>
  );
};

export default AddDeliveryAddress;
