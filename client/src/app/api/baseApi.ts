// import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// const customBaseQuery = fetchBaseQuery({})

import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { startLoading, stopLoading } from '../layout/uiSlice';
//import { startLoading, stopLoading } from "../layout/uiSlice";
//import { toast } from "react-toastify";
//import { router } from '../routes/Routes';

//fetchBaseQuery(...) does not perform the API request immediately.
//fetchBaseQuery(...)  is a factory — it returns a function.
//It returns a function that knows how to make requests with that baseUrl.
//it expects the parameters (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => Promise<BaseQueryResult>
//customBaseQuery is a function
const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:5001/api',
  // baseUrl: import.meta.env.VITE_API_URL,
  // credentials: 'include'
});

//type ErrorResponse = | string | { title: string } | { errors: string[] };
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

//api from ReduxToolKit
export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(startLoading());
  //if (import.meta.env.DEV) await sleep();
  await sleep();

  //executing that returned function when fetchBaseQuery() is called.
  //returned function expects the parameters (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => Promise<BaseQueryResult>
  //The parameters (args, api, extraOptions) are what fetchBaseQuery expects every time it makes a request.
  const result = await customBaseQuery(args, api, extraOptions);

  //RTK Query automatically provides api object when it calls base query. that gives access 
  //to Redux store where the startLoading and stoploading were added from the uiSlice
  //api includes the dispatch function from Redux store.
  //dispatch is the way to tell Redux: “Hey, update the state by running this action.”
  //stopLoading() is one of the actions created in uiSlice

  api.dispatch(stopLoading());

  if (result.error) {
    const { status, data } = result.error;
    console.log(status, data);

    //console.log(result.error);

    // const originalStatus = result.error.status === 'PARSING_ERROR' && result.error.originalStatus
    //     ? result.error.originalStatus
    //     : result.error.status

    // const responseData = result.error.data as ErrorResponse;

    // switch (originalStatus) {
    //     case 400:
    //         if (typeof responseData === 'string') toast.error(responseData);
    //         else if ('errors' in responseData) {
    //             throw Object.values(responseData.errors).flat().join(', ')
    //         }
    //         else toast.error(responseData.title);
    //         break;
    //     case 401:
    //         if (typeof responseData === 'object' && 'title' in responseData)
    //             toast.error(responseData.title);
    //         break;
    //     case 403:
    //         if (typeof responseData === 'object')
    //             toast.error('403 Forbidden');
    //         break;
    //     case 404:
    //         if (typeof responseData === 'object' && 'title' in responseData)
    //             router.navigate('/not-found')
    //         break;
    //     case 500:
    //         if (typeof responseData === 'object')
    //             router.navigate('/server-error', { state: { error: responseData } })
    //         break;
    //     default:
    //         break;
    // }
  }

  return result;
};
