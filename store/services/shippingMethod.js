import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getShippingMethods: build.query({
      query: () => ({
        url: '/shipping-methods',
      }),
      transformResponse: response => response.data,
    }),
    getShippingMethodsCost: build.query({
      query: id => ({
        url: `/products/${id}/shipping-methods`,
      }),
      transformResponse: response => response.data,
    }),
  }),
  overrideExisting: true,
});

export const {useLazyGetShippingMethodsQuery, useGetShippingMethodsCostQuery} =
  extendedApi;
