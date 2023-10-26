import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import useAuth from '../../../hooks/useAuth';
import {BottomNavigation_Route, Sign_In} from '../../constants/routes';

const CallbackComponent = ({navigation, route}) => {
  const {setToken} = useAuth();
  const {params} = route;
  useEffect(() => {
    if (params.tokenId) {
      setToken(params.tokenId);
      navigation.replace(BottomNavigation_Route);
    } else {
      navigation.replace(Sign_In);
    }
  }, []);
  return <ActivityIndicator size={'large'} />;
};

export default CallbackComponent;

const styles = StyleSheet.create({});
