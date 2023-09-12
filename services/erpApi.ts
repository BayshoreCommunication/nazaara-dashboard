import { TErpData, TResult } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const erpApi = createApi({
  reducerPath: 'erpApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://erp.anzaralifestyle.com` }),
  endpoints: (builder) => ({
    getAllErpData: builder.query<
      TErpData,
      { page?: number; page_size?: number }
    >({
      query: ({ page, page_size }) => {
        return {
          url: `/api/product/Details/?format=json&page=${page}&page_size=${page_size}`,
          headers: {
            Authorization: `Token ${process.env.AUTH_TOKEN}`,
          },
        }
      },
    }),
    getErpDataById: builder.query<TResult, { singleProductId?: number }>({
      query: ({ singleProductId }) => {
        return {
          url: `/api/product/Details/${singleProductId}/?format=json`,
          headers: {
            Authorization: `Token ${process.env.AUTH_TOKEN}`,
          },
        }
      },
    }),
  }),
})

export const { useGetAllErpDataQuery, useGetErpDataByIdQuery } = erpApi
