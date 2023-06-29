import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import React, {useEffect, useRef} from 'react';
import Root from '../../components/Root';

const PaystackPayment = ({navigation, route}) => {
  const webViewRef = useRef(null);
  const checkoutUrl = route?.params?.checkoutUrl;

  console.log(checkoutUrl);

  // const injectedJavaScript = `
  //     window.ReactNativeWebView.postMessage(JSON.stringify({
  //       paymentCompleted: true,
  //       paymentData: // Add your payment data here,
  //     }));
  //   `;
  const handlePaymentComplete = event => {
    const {data} = event.nativeEvent;
    // Process the payment completion data
    console.log('Payment completed:', data);
  };

  onNavigationStateChange = state => {
    const {url} = state;

    if (!url) return;

    if (url.includes('/verify')) {
      console.log('url changed', url);

      // remember to Use a navigator to pop off the view
      navigation.navigate('Orders');
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
