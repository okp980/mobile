import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseURL} from '../../config/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: baseURL}),
  endpoints: () => ({}),
});
