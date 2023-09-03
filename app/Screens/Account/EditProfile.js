import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS} from '../../constants/theme';
import Root from '../../components/Root';
import {Formik} from 'formik';
import useModal from '../../../hooks/useModal';
import CustomInput from '../../components/CustomInput';
import {change_password_validation} from '../../../helpers/formValidations';
import {useChangePasswordMutation} from '../../../store/services/auth';
import {FULL_SCREEN_LOADER} from '../../constants/modal';
import {showMessage} from 'react-native-flash-message';

const PValues = {
  current_password: '',
  new_password: '',
  confirm_password: '',
};

const EditProfile = props => {
  const [initialValues] = useState(PValues);
  const {handleOpenModal, handleCloseModal} = useModal();
  const formRef = useRef();
  const [changePassword] = useChangePasswordMutation();

  const submit = async (values, {resetForm}) => {
    handleOpenModal({type: FULL_SCREEN_LOADER});
    try {
      await changePassword({
        newPassword: values.new_password,
        confirmPassword: values.confirm_password,
        oldPassword: values.current_password,
      }).unwrap();
      showMessage({
        message: 'Password Changed',
        type: 'success',
      });
      resetForm();
      handleCloseModal();
    } catch (error) {
      showMessage({
        message: error?.data?.data || 'Password Change Failed!',
        type: 'success',
      });
      handleCloseModal();
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
      <View style={{flex: 1}}>
        <KeyboardAvoidingView>
          <Formik
            initialValues={initialValues}
            onSubmit={submit}
            innerRef={formRef}
            validationSchema={change_password_validation}
            enableReinitialize>
            {({handleChange, values, errors}) => (
              <>
                <CustomInput
                  label="Current Password"
                  placeholder="Enter First name"
                  onChangeText={handleChange('current_password')}
                  value={values.current_password}
                  error={errors.current_password}
                />
                <CustomInput
                  label="New Password"
                  placeholder="Enter Last name"
                  onChangeText={handleChange('new_password')}
                  value={values.new_password}
                  error={errors.new_password}
                />
                <CustomInput
                  label="Confirm Password"
                  placeholder="Enter Phone Number"
                  onChangeText={handleChange('confirm_password')}
                  value={values.confirm_password}
                  error={errors.confirm_password}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
      <View style={GlobalStyleSheet.container}>
        <CustomButton onPress={handleSubmitBtn} title={'Submit'} />
      </View>
    </Root>
  );
};

export default EditProfile;
