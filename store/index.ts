import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {apiSlice} from './api';
import authReducer from './feature/auth/authSlice';
import snackbarReducer from './feature/snackbar/snackbarSlice';
import networkReducer from './feature/network/networkSlice';
import modalReducer from './feature/modal/modalSlice';
const createDebugger = require('redux-flipper').default;
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  snackbar: snackbarReducer,
  modal: modalReducer,
  network: networkReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware, createDebugger());
  },
  devTools: __DEV__,
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);
