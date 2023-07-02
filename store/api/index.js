import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseURL} from '../../config/api';
import {
  CART,
  DEFAULT_ADDRESS,
  SHIPPING_ADDRESS,
  SHIPPING_METHODS,
} from '../../app/constants/Tags';

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, api) => {
    const token = api.getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Expires', '0');
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: [
    CART,
    SHIPPING_ADDRESS,
    DEFAULT_ADDRESS,
    {type: SHIPPING_ADDRESS, id: DEFAULT_ADDRESS},
    SHIPPING_METHODS,
  ],
  endpoints: () => ({}),
});
