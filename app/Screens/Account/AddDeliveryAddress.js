import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomInput from '../../components/CustomInput';
import {KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import {useRef} from 'react';
import {
  useCreateShippingAddressMutation,
  useLazyGetSingleShippingAddressQuery,
  useUpdateSingleAddressMutation,
} from '../../../store/services/shippingAddress';
import {Address_Route, Cart_Route, Confirm_Order} from '../../constants/routes';
import {useEffect} from 'react';
import Root from '../../components/Root';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import useModal from '../../../hooks/useModal';
import {FULL_SCREEN_LOADER} from '../../constants/modal';
import nigeria_states from '../../../data/nigerian-states.json';
import Loading from '../../components/Loading/Loading';
import ErrorOccurred from '../../components/ErrorOccurred/ErrorOccurred';
import SelectDropdown from 'react-native-select-dropdown';
import {COLORS, FONTS} from '../../constants/theme';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const addressValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  country: '',
  state: '',
  lga: '',
  city: '',
  address: '',
};

const AddDeliveryAddress = ({navigation, route}) => {
  const from = route?.params?.from;
  const edit = route?.params?.edit;
  const addressId = route?.params?.addressId;
  const [createAddress] = useCreateShippingAddressMutation();
  const [
    getAddress,
    {isLoading: isLoadingGetAddress, isError: isErrorGetAddress},
  ] = useLazyGetSingleShippingAddressQuery();
  const [updateAddress] = useUpdateSingleAddressMutation();
  const [initialValues, setInitialValues] = useState(addressValues);
  const formRef = useRef();
  const {handleOpenModal, handleCloseModal} = useModal();
  const [lga, setLga] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        e.preventDefault();

        if (from && from === Confirm_Order) {
          navigation.navigate(Cart_Route);
        } else {
          navigation.dispatch(e.data.action);
        }
      });
      // Clean up the listener when the component is unmounted
      return () => {
        unsubscribe();
      };
    }, [navigation]),
  );

  useEffect(() => {
    if (edit && addressId) {
      getAddress(addressId)
        .unwrap()
        .then(data => {
          setInitialValues(getAddressInfo(data));
          setLga(nigeria_states[getAddressInfo(data)?.state]);
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
      lga: data?.lga,
      address: data?.address,
    };
  }

  const submit = async values => {
    handleOpenModal({type: FULL_SCREEN_LOADER});
    try {
      let res;
      if (edit) {
        res = await updateAddress({id: addressId, values}).unwrap();
      } else {
        res = await createAddress(values).unwrap();
      }
      from ? navigation.replace(from) : navigation.navigate(Address_Route);
      handleCloseModal();
    } catch (error) {
      handleCloseModal();
      console.log(error);
    }
  };

  const handleSubmitBtn = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const getCountries = () => Object.keys(nigeria_states);

  if (isLoadingGetAddress) return <Loading />;
  if (isErrorGetAddress) return <ErrorOccurred />;
  return (
    <Root>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          innerRef={formRef}
          enableReinitialize>
          {({handleChange, handleSubmit, values, setFieldValue}) => (
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

              <CustomSelect
                data={['Nigeria']}
                label={'Select Country'}
                defaultValue={values.country}
                defaultButtonText="Choose your Country"
                onSelect={(selectedItem, index) => {
                  setFieldValue('country', selectedItem);
                }}
              />

              <CustomSelect
                data={getCountries()}
                label={'Select state'}
                defaultValue={values.state}
                defaultButtonText="Choose your State"
                onSelect={(selectedItem, index) => {
                  setFieldValue('state', selectedItem);
                  setFieldValue('lga', '');
                  setLga(nigeria_states[selectedItem]);
                }}
              />
              <CustomSelect
                data={lga}
                defaultValue={values.lga}
                label={'Select Destrict'}
                defaultButtonText="Choose your Destrict"
                onSelect={(selectedItem, index) => {
                  setFieldValue('lga', selectedItem);
                }}
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
      </KeyboardAwareScrollView>
      <View style={GlobalStyleSheet.container}>
        <CustomButton
          onPress={handleSubmitBtn}
          title={`${edit ? 'Edit' : 'Add'} Address`}
        />
      </View>
    </Root>
  );
};

export default AddDeliveryAddress;
