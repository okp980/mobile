import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import React, {useEffect, useRef} from 'react';
import Root from '../../components/Root';
import {OrderDetail_Route, PaystackPayment_Route} from '../../constants/routes';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const PaystackPayment = ({navigation, route}) => {
  const webViewRef = useRef(null);
  const checkoutUrl = route?.params?.checkoutUrl;
  const orderId = route?.params?.orderId;

  console.log('order id', orderId);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        console.log(e);
        e.preventDefault();
        if (e.data.action.type === 'GO_BACK') {
          Alert.alert(
            'CANCEL PAYMENT',
            'Are you sure you want to cancel payment? If your order is not paid after 30 days, it will be canceled.',
            [
              {
                text: 'Yes, Cancel',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen

                onPress: () => {
                  unsubscribe();
                  navigation.replace(OrderDetail_Route, {
                    orderId,
                    from: PaystackPayment_Route,
                  });
                },
              },
              {text: 'No, Continue', style: 'cancel', onPress: () => {}},
            ],
          );
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

  console.log(checkoutUrl);

  // const injectedJavaScript = `
  //     window.ReactNativeWebView.postMessage(JSON.stringify({
  //       paymentCompleted: true,
  //       paymentData: // Add your payment data here,
  //     }));
  //   `;
  const handlePaymentComplete = event => {
    const {data} = event.nativeEvent;
    console.log(event);
    // Process the payment completion data
    console.log('Payment completed:', data);
  };

  onNavigationStateChange = state => {
    const {url} = state;

    if (!url) return;

    // if (url.includes('cancelled=true')){
    //   navigation.goBack()
    // }
    if (url.includes('/verify')) {
      navigation.replace(OrderDetail_Route, {
        orderId,
        from: PaystackPayment_Route,
      });
    }
  };

  // useEffect(() => {
  //   // Handle Paystack payment completion

  //   // Inject JavaScript code into the WebView to handle payment completion

  //   // Add event listener for postMessage from the WebView
  //   webViewRef?.current?.addEventListener('message', handlePaymentComplete);

  //   return () => {
  //     // Remove event listener when component unmounts
  //     webViewRef?.current?.removeEventListener(
  //       'message',
  //       handlePaymentComplete,
  //     );
  //   };
  // }, []);
  return (
    <Root noPadding>
      <WebView
        ref={webViewRef}
        source={{uri: checkoutUrl}}
        javaScriptEnabled={true}
        // injectedJavaScript={injectedJavaScript}
        onMessage={handlePaymentComplete}
        onNavigationStateChange={onNavigationStateChange}
        renderLoading={() => <ActivityIndicator />}
        startInLoadingState={true}
      />
    </Root>
  );
};

export default PaystackPayment;

const styles = StyleSheet.create({});
