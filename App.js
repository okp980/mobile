import React, {useEffect} from 'react';
import Routes from './app/Navigations/Route';
import {Provider} from 'react-redux';
import {store} from './store';

import useNetwork from './hooks/useNetwork';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
};

export default App;
