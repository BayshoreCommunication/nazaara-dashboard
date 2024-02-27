import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUsers {
  status: string;
  total: number;
  data: IUser[];
}

export interface IUserOne {
  success: boolean;
  message: string;
  data: IUser;
}

export interface IUser {
  _id: string;
  fullName: string;
  gender: string;
  email: string;
  phone: string;
  refund: number;
  imageUrl: string;
  userType: string;
  addressBook: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Nazaara@Token ${process.env.API_SECURE_KEY}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUsers, void>({
      query: () => `/api/v1/user`,
    }),
    getUserById: builder.query<IUserOne, string>({
      query: (id: string) => `/api/v1/user/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
