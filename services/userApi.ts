import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUsers {
    status: string
    total: number
    data: IUser[]
  }
  
  export interface IUser {
    _id: string
    fullName: string
    email: string
    phone: string
    refund: number
    imageUrl: string
    userType: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "process.env.API_URL" }),
    endpoints: (builder) => ({
      getUsers: builder.query<IUsers, void>({
        query: () => `/api/v1/user/`,
      }),
      getUserById: builder.query<IUser, string>({
        query: (id: string) => `/api/v1/user/${id}`,
      }),
    }),
  });
  
  export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;