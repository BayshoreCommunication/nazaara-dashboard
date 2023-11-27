import { TGetProduct } from "./types";

export type TFastivalData = {
  success: boolean;
  message: string;
  data: TFastival[];
};

export type TFastival = {
  _id: string;
  title: string;
  slug: string;
  products: TGetProduct[];
  status: string;
  createdAt: string;
  updatedAt: string;
  featuredImage: string;
  __v: number;
};

export type TFastivalCreate = {
  title: string;
  slug: string;
  products: string[];
  status: string;
  featuredImage: string;
};

export type TFastivalDataOne = {
  success: boolean;
  message: string;
  data: TFastivalOne;
};

export type TFastivalOne = {
  _id?: string;
  title: string;
  slug: string;
  products: TFastivalProduct[];
  status: string;
  featuredImage: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TFastivalProduct = {
  _id: string;
  erpId: number;
  sku: string;
  slug: string;
  productName: string;
  purchasePrice: number;
  regularPrice: number;
  salePrice: number;
  variant: TFastivalProductVariant[];
  size: string[];
  description: string;
  erpCategory: string;
  erpSubCategory: string;
  category: string;
  subCategory: string;
  stock: number;
  preOrder: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TFastivalProductVariant = {
  color: string;
  imageUrl: string[];
  _id: string;
};
