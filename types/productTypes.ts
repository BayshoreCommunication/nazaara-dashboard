export interface Product {
  _id: string;
  erpId: number;
  sku: string;
  slug: string;
  productName: string;
  purchasePrice: number;
  regularPrice: number;
  salePrice: number;
  variant: Variant[];
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
}

export interface Variant {
  color: string;
  imageUrl: string[];
  _id: string;
}

 



