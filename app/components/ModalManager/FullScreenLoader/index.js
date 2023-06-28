import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Loading from '../../Loading/Loading';
import {COLORS} from '../../../constants/theme';

const FullScreenLoader = () => {
  return (
    <View>
      <Loading size="small" color={COLORS.white} />
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({});
