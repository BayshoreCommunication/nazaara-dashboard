import { TGetProduct } from "./types";

export type TSaleData = {
  success: boolean;
  message: string;
  data: TSale[];
};

export type TSale = {
  featuredImage: string;
  _id?: string;
  title: string;
  slug: string;
  products: TGetProduct[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TSaleCreate = {
  title: string;
  slug: string;
  products: string[];
  status: string;
};
