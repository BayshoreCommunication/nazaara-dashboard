import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IHiring {
  success: boolean
  message: string
  data: IHiringData[]
}

export interface IHiringData {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  __v: number
}

export const hiringApi = createApi({
  reducerPath: 'hiringApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ['Hiring'],
  endpoints: (builder) => ({
    getAllHiring: builder.query<IHiring, void>({
      query: () => `/api/v1/hiring-customization`,
      providesTags: ['Hiring'],
    }),
    getHiringById: builder.query<IHiringData, string>({
      query: (id: string) => `/api/v1/hiring-customization/${id}`,
      providesTags: ['Hiring'],
    }),

    createHiringCustomization: builder.mutation<
      IHiringData,
      Partial<IHiringData>
    >({
      query: (payload) => ({
        url: '/api/v1/hiring-customization',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Hiring'],
    }),

    updateHiringCustomization: builder.mutation<
      IHiringData,
      { id: string; payload: Partial<any> }
    >({
      query: ({ id, payload }) => ({
        url: `/api/v1/hiring-customization/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Hiring'],
    }),

    deleteHiringCustomization: builder.mutation({
      query: (id) => ({
        url: `/api/v1/hiring-customization/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllHiringQuery,
  useGetHiringByIdQuery,
  useCreateHiringCustomizationMutation,
  useUpdateHiringCustomizationMutation,
  useDeleteHiringCustomizationMutation,
} = hiringApi
