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
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
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
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getContacts: builder.query<Contact, void>({
      query: () => `/api/v1/contact`,
      providesTags: ["Contact"],
    }),
    getContactByID: builder.query<ContactByID, string>({
      query: (id: string) => `/api/v1/contact/${id}`,
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation<AddContact, Partial<AddContact>>({
      query: (body) => ({
        url: `/api/v1/contact`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/api/v1/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIDQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
