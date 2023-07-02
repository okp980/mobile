import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {apiSlice} from './api';
import authReducer from './feature/auth/authSlice';
import snackbarReducer from './feature/snackbar/snackbarSlice';
import networkReducer from './feature/network/networkSlice';
import modalReducer from './feature/modal/modalSlice';
const createDebugger = require('redux-flipper').default;

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    modal: modalReducer,
    network: networkReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(apiSlice.middleware, createDebugger());
  },
});
setupListeners(store.dispatch);
