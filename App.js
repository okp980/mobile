import React, {useEffect} from 'react';
import Routes from './app/Navigations/Route';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

import {store} from './store';

const App = () => {
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
