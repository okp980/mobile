import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider, DefaultTheme, Snackbar} from 'react-native-paper';
import useToast from '../../hooks/useToast';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import useNetwork from '../../hooks/useNetwork';
import {useEffect} from 'react';

const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: COLORS.white,
  },
  // fonts: 'regular',
};

const Routes = () => {
  const {
    show,
    type: toastType,
    message: toastMessage,
    handleClearToast,
    handleMessageToast,
  } = useToast();

  const {setIsConnected} = useNetwork();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      !state.isConnected &&
        handleMessageToast({message: 'Oops!. Lost internet connection 😢'});
      console.log(`connection is ${state.isConnected}`);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Provider
      theme={theme}
      settings={{
        icon: props => <Ionicons {...props} />,
      }}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          zIndex: 20,
          width: '100%',
          height: !show ? 0 : 20,
          bottom: 0,
        }}>
        <Snackbar
          style={{
            backgroundColor:
              toastType === 0
                ? COLORS.dark
                : toastType === 1
                ? COLORS.success
                : toastType === 2
                ? COLORS.warning
                : toastType === 3
                ? COLORS.danger
                : 'transparent',
          }}
          wrapperStyle={{
            color: COLORS.success,
          }}
          visible={show}
          onDismiss={handleClearToast}
          // theme="light"
          action={{
            label: 'Dismiss',
            onPress: handleClearToast,
          }}>
          {toastMessage}
        </Snackbar>
      </View>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
export default Routes;
