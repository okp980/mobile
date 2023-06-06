import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseURL} from '../../config/api';
import {CART} from '../../app/constants/Tags';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: baseURL}),
  tagTypes: [CART],
  endpoints: () => ({}),
});
