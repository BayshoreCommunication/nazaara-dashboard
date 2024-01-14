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
  promotion?: string;
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
  featureImage?: string;
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
};
