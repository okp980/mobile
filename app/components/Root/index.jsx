import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/theme';

const Root = ({children, containerStyle, noPadding, viewStyle, ...props}) => {
  return (
    <SafeAreaView style={[styles.container, containerStyle]} {...props}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.backgroundColor}
        networkActivityIndicatorVisible
      />
      <View style={[styles.view, viewStyle, {padding: noPadding ? 0 : 20}]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  view: {
    flex: 1,
  },
});
