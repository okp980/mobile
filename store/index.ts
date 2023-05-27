import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './feature/counter/counterSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import {apiSlice} from './api';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
setupListeners(store.dispatch);
