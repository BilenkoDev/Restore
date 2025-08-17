// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { createApi } from '@reduxjs/toolkit/query/react';
import { Product } from '../../app/models/product';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';

//fetchProducts and fetchProductDetails are endpoints queries
//fetchProducts is a query name
//createApi generates a react hooks
export const catalogApi = createApi({
  reducerPath: 'catalogApi', //'api' by default if not specified
  // baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:5001/api'}),

  //RTK Query will call baseQuery function every time an endpoint like fetchProducts runs.
  //RTK Query calls baseQueryWithErrorHandling automatically and passes the right arguments. (args, api, extraOptions)
  //RTK Query internally calls baseQueryWithErrorHandling with (args, api, extraOptions).
  //RTK Query injects them (args, api, extraOptions) when it runs baseQuery.
  baseQuery: baseQueryWithErrorHandling, // baseQueryWithErrorHandling is an arrow function
  endpoints: (builder) => ({
    //fetchProducts is a query name for products to fetch
    //query<Product[], void> Product[] - Result type, void - query arg type
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: 'products' }),
    }),

    //query<Product[], void> Product[] - Result type, number - query arg type
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),
    // fetchFilters: builder.query<{ brands: string[], types: string[] }, void>({
    //     query: () => 'products/filters'
    // })
  }),
});

//useFetchProductDetailsQuery, useFetchProductsQuery are generates react hooks
//by createApi. These hooks can be used in components.
export const { useFetchProductDetailsQuery, useFetchProductsQuery } =
  catalogApi;
