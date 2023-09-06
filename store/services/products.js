import {apiSlice} from '../api';
import queryString from 'query-string';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query({
      query: params => ({
        url: `/products?${queryString.stringify(params, {
          arrayFormat: 'comma',
          skipEmptyString: true,
        })}`,
      }),
    }),
    getProductsByCategory: build.query({
      query: ({categoryId, ...params}) => ({
        url: `/categories/${categoryId}/products`,
        params,
      }),
    }),
    getProductsBySubCategory: build.query({
      query: ({subcategoryId, ...params}) => ({
        url: `/subcategories/${subcategoryId}/products`,
        params,
      }),
    }),
    getNewArrivals: build.query({
      query: params => ({
        url: '/products/new-arrival',
        params,
      }),
    }),
    getTrendingProducts: build.query({
      query: params => ({
        url: '/products/trending',
        params,
      }),
    }),
    getRecommendedProducts: build.query({
      query: params => ({
        url: '/products/recommended',
        params,
      }),
    }),
    getSingleProducts: build.query({
      query: productId => `/products/${productId}`,
    }),
    getSearchProducts: build.query({
      query: searchWord => `/products/search/${searchWord}`,
    }),
    getAttributes: build.query({
      query: () => `/attributes`,
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetSingleProductsQuery,
  useLazyGetProductsByCategoryQuery,
  useGetProductsByCategoryQuery,
  useLazyGetProductsBySubCategoryQuery,
  useGetProductsBySubCategoryQuery,
  useLazyGetNewArrivalsQuery,
  useLazyGetTrendingProductsQuery,
  useLazyGetRecommendedProductsQuery,
  useGetAttributesQuery,
  useGetSearchProductsQuery,
} = extendedApi;
