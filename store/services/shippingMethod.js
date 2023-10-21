import {SHIPPING_METHODS} from '../../app/constants/Tags';
import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getShippingMethods: build.query({
      query: () => ({
        url: '/shipping-methods',
      }),
      transformResponse: response => response.data,
      providesTags: [SHIPPING_METHODS],
    }),
    getOrderShippingCosts: build.query({
      query: () => ({
        url: '/shipping-methods/orders/cost',
      }),
      transformResponse: response => response.data,
      // providesTags: [SHIPPING_METHODS],
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

export const {
  useLazyGetShippingMethodsQuery,
  useGetShippingMethodsQuery,
  useGetShippingMethodsCostQuery,
  useLazyGetOrderShippingCostsQuery,
} = extendedApi;
