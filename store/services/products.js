import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query({
      query: ({category, subCategory}) => ({
        url: '/products',
        params: {category, sub_category: subCategory},
      }),
    }),
    getSingleProducts: build.query({
      query: productId => `/products/${productId}`,
    }),
  }),

  overrideExisting: true,
});

export const {useGetProductsQuery, useGetSingleProductsQuery} = extendedApi;
