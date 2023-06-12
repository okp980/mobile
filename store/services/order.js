import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    createOrder: build.mutation({
      query: values => ({url: '/orders', method: 'POST', body: values}),
      transformResponse: response => response.data,
    }),
  }),

  overrideExisting: true,
});

export const {useCreateOrderMutation} = extendedApi;
