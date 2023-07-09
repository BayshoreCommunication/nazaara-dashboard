import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Contact {
  status: string;
  data: Data[];
}

interface ContactByID {
  status: string;
  data: Data;
}

interface Data {
  _id: string;
  message: string;
  status: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  refund: number;
}

interface AddContact {
  message: string;
  status: string;
  user: string;
}

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact, void>({
      query: () => `/api/v1/contact`,
    }),
    getContactByID: builder.query<ContactByID, string>({
      query: (id: string) => `/api/v1/contact/${id}`,
    }),
    addContact: builder.mutation<AddContact, Partial<AddContact>>({
      query: (body) => ({
        url: `/api/v1/contact`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIDQuery,
  useAddContactMutation,
} = contactsApi;
