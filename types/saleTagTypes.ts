export type TSaleData = {
  success: boolean;
  message: string;
  saleData: TSale[];
};

export type TSale = {
  _id: string;
  saleTitle: string;
  navCategoryTitle: string;
  productSlug: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
