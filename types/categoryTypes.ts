export type TCategory = {
  success: boolean;
  message: string;
  data: TCategoryData[];
};

export type TCategoryData = {
  _id?: string;
  title: string;
  slug?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  promotion?: any;
};

export type TSubCategory = {
  success: boolean;
  message: string;
  data: TSubCategoryData[];
};

export type TSubCategoryData = {
  _id?: string;
  title: string;
  slug?: string;
  category: TCategoryIndividual;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  promotion?: any;
  featuredImage?: string;
};

export type TCategoryIndividual = {
  _id?: string;
  title: string;
};

export type TSubCategoryFrom = {
  _id?: string;
  title: string;
  slug?: string;
  category: string;
  status: string;
  promotion?: any;
  featuredImage: string;
  featuredImagePublicId: string;
};
