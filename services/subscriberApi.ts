import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ISubscriber {
  status: string;
  data: IData[];
}

export interface IData {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const subscribeApi = createApi({
  reducerPath: "subscribeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getSubscriber: builder.query<ISubscriber, void>({
      query: () => `/api/v1/subscriber`,
    }),
  }),
});

export const { useGetSubscriberQuery } = subscribeApi;
