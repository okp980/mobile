import React, {useEffect} from 'react';
import Routes from './app/Navigations/Route';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';

import {store} from './store';
import {Platform} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import {displayBlockedAlert} from './helpers/util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const TOPIC = 'weather';

  const requestAndroidPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    console.log('Permission is ===> ', result);
    if (result === 'blocked')
      return displayBlockedAlert(
        'Zuraaya needs you to turn on notifications in order to reveive in app notifications.',
      );
    else if (result === 'denied') {
      console.log('Yes, trying to request');
      const res = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log('Res, afer request ==>', res);
      if (res === 'blocked' || res === 'denied')
        return displayBlockedAlert(
          'Zuraaya needs you to turn on notifications in order to receive in app notifications.',
        );
      else if (res === 'granted') {
        let FirebasePushToken = await AsyncStorage.getItem('FirebasePushToken');
        if (!FirebasePushToken) {
          FirebasePushToken = await messaging().getToken();
          if (FirebasePushToken) {
            AsyncStorage.setItem('FirebasePushToken', FirebasePushToken);
          }
        }
        return;
      }
    } else if (result === 'granted') {
      let FirebasePushToken = await AsyncStorage.getItem('FirebasePushToken');
      if (!FirebasePushToken) {
        FirebasePushToken = await messaging().getToken();
        if (FirebasePushToken) {
          AsyncStorage.setItem('FirebasePushToken', FirebasePushToken);
        }
      }
      console.log('FirebasePushToken', FirebasePushToken);
      return;
    }
  };

  async function requestIOSPermission() {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    getToken();
  }

  // check permissions
  async function checkPermissions() {
    const authStatus = await messaging().hasPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getToken();
    } else {
      requestIOSPermission();
    }
  }

  // getToken
  async function getToken() {
    let FirebasePushToken = await AsyncStorage.getItem('FirebasePushToken');
    if (!FirebasePushToken) {
      FirebasePushToken = await messaging().getToken();
      if (FirebasePushToken) {
        AsyncStorage.setItem('FirebasePushToken', FirebasePushToken);
      } else {
        checkPermissions();
      }
    }
  }

  //  Push notification
  useEffect(() => {
    // check permission
    if (Platform.OS === 'android') {
      requestAndroidPermission();
    }

    if (Platform.OS === 'ios') {
      checkPermissions();
    }

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification:' +
              'Notification caused app to open from quit state',
          );
          console.log(remoteMessage);
          alert(
            'getInitialNotification: Notification caused app to' +
              ' open from quit state',
          );
        }
      });

    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp: ' +
            'Notification caused app to open from background state',
        );
        console.log(remoteMessage);
        alert(
          'onNotificationOpenedApp: Notification caused app to' +
            ' open from background state',
        );
      }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new FCM message arrived!');
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    /**
     * Apps can subscribe to a topic, which allows the FCM
     * server to send targeted messages to only those devices
     * subscribed to that topic.
     */
    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;
      /**
       * Unsubscribe the device from a topic.
       */
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
};

export default App;
