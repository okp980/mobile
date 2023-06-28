import {apiSlice} from '../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query({
      query: () => ({
        url: '/products',
        // params: {category, sub_category: subCategory},
      }),
    }),
    getProductsByCategory: build.query({
      query: ({categoryId, ...params}) => ({
        url: `/categories/${categoryId}/products`,
        params: {...params},
      }),
    }),
    getProductsBySubCategory: build.query({
      query: ({subcategoryId, ...params}) => ({
        url: `/subcategories/${subcategoryId}/products`,
        params: {...params},
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
  }),

  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useLazyGetProductsByCategoryQuery,
  useGetProductsByCategoryQuery,
  useLazyGetProductsBySubCategoryQuery,
  useGetProductsBySubCategoryQuery,
  useLazyGetNewArrivalsQuery,
  useLazyGetTrendingProductsQuery,
  useLazyGetRecommendedProductsQuery,
} = extendedApi;
