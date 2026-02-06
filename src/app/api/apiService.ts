import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { ErrorResponse } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: apiUrl }): BaseQueryFn<AxiosRequestConfig, unknown, ErrorResponse> =>
  async ({ url, method, data, params }) => {
    try {
      console.log(apiUrl);
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      return {
        error: error.response?.data || { status: 500, statusText: 'Error', data: 'An error occurred' },
      };
    }
  };
