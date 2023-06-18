import {apiSlice} from '../../api';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query({
      query: () => '/categories',
    }),
    getSubCategories: build.query({
      query: categoryId => `/categories/${categoryId}/subcategories`,
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useLazyGetSubCategoriesQuery,
  useLazyGetCategoriesQuery,
} = extendedApi;
