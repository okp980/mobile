import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getPaymentMethod: build.query({
      query: () => ({url: '/payment-methods'}),
      transformResponse: response => response.data,
    }),
  }),

  overrideExisting: true,
});

export const {useLazyGetPaymentMethodQuery} = extendedApi;
