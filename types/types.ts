export type ErpIdProps = {
  params: {
    productID: number;
  };
};

export type TErpData = {
  count: number;
  next: string;
  previous: string;
  results: TResult[];
  total_purchase_price: number;
  total_selling_price: number;
  total_quantity: number;
  current_purchase_price: number;
  current_selling_price: number;
  current_quantity: number;
};

export type TResult = {
  id: number;
  Warehouse: number;
  ProductDetails: TProductDetails;
  Color: number;
  Size: number;
  ProductImage: TImage[];
  ref_type: string;
  quantity: number;
  purchase_price: string;
  selling_price: string;
  price: string;
  barcode: string;
  data: string;
  BulkProduct?: any;
  Custom_one?: any;
  Custom_two?: any;
  Deatils: TProductDetails[];
  is_active: boolean;
  title: string;
  category: string;
  parent_category: string;
  Warehouse_name: string;
  color: string;
  size: string;
  image: TImage2[];
};

export type TImage2 = {
  id: number;
  photo: string;
  is_active: boolean;
  ProductDetails: number;
  ProductLocation?: any;
  Color: number;
};

export type TProductDetails = {
  id: number;
  Category: TCategory;
  title: string;
  slug: string;
  Short_description?: any;
  tags?: any;
  stock_unit: string;
  stock_alart_amount: number;
  height?: any;
  width?: any;
  weight?: any;
  discount_type: string;
  discount?: string;
  tax?: any;
  is_active: boolean;
  product_code: string;
  quantity: number;
  min_price: string;
  max_price: string;
  data: TData;
  Sub_Category?: any;
  Merchandiser?: any;
  parent_category: string;
  main_category: string;
  category_name: string;
  cover: TCover[];
  image: TImage[];
};

export type TImage = {
  id: number;
  photo: string;
  is_active: boolean;
  ProductDetails: number;
  ProductLocation?: any;
  Color?: number;
};

export type TCover = {
  id: number;
  photo: string;
  is_active: boolean;
  ProductDetails: number;
  ProductLocation?: any;
  Color?: any;
};

export type TData = {
  colors: TColor[];
  sizes: TSize[];
  attributes: number[];
};

export type TSize = {
  name: string;
  id: number;
  inStock: boolean;
};

export type TColor = {
  name: string;
  id: number;
  code?: any;
  class: string;
};

export type TCategory = {
  id: number;
  data: string;
  parent: TParent;
  name: string;
  slug: string;
  Category_parent: number;
  title: string;
  key: number;
  value: number;
  immediate_parent: TImmediateparent;
};

export type TImmediateparent = {
  id: number;
  name: string;
  slug: string;
  data: string;
  Category_parent: number;
  title: string;
  key: number;
  value: number;
};

export type TParent = {
  id: number;
  name: string;
  slug: string;
  data: string;
  Category_parent?: any;
  title: string;
  key: number;
  value: number;
};

// =============== Product Types ============ /

export type TProductGetOne = {
  success: boolean;
  message: string;
  data: TProduct;
};

export type TProduct = {
  erpId?: number;
  sku: string;
  slug?: string;
  productName: string;
  purchasePrice: number;
  regularPrice: number;
  salePrice: number;
  variant: TVariant[];
  size: string[];
  saleIds?: [];
  festivalIds?: [];
  description: string;
  erpCategory: string;
  erpSubCategory: string;
  category: string;
  subCategory: string;
  stock: number;
  preOrder: boolean;
  status: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TVariant = {
  _id?: string;
  color: string;
  imageUrl: string[];
};

export type TProducts = {
  status: string;
  total: number;
  totalPages: number;
  currentPage: number;
  previousPage: any;
  nextPage: number;
  product: TProduct[];
};

// export type TProduct = {
//   _id?: string;
//   erpId: number;
//   sku?: string;
//   slug?: string;
//   productName: string;
//   purchasePrice: number;
//   regularPrice: number;
//   salePrice?: number;
//   size: string[];
//   variant: TVariant[];
//   description: string;
//   category: string;
//   subCategory: string;
//   erpCategory: string;
//   erpSubCategory: string;
//   stock: number;
//   preOrder?: boolean;
//   status: string;
//   createdAt?: string;
//   updatedAt?: string;
//   __v?: number;
// };

export type TProductErpIdData = {
  status: string;
  result: TProductErpId[];
};

export type TProductErpId = {
  _id: string;
  erpId: number;
};

export type TProductCategory = {
  status: string;
  length: number;
  newData: TCategoryItem[];
};

export type TCategoryItem = {
  category: string;
  count: number;
  url: string;
};

export type TProductSlugData = {
  success: boolean;
  slugs: TProductSlug[];
};

export type TProductSlug = {
  slug: string;
};

export type TGetProduct = {
  _id: string;
  slug: string;
};

// ============================= Image Urls ============================= //
export type TImageUrl = {
  _id?: number;
  data_url: string;
  file: {};
};

// ============================ Coupons =============================== //

export type TCoupons = {
  status: string;
  total: number;
  data: TCoupon[];
};

export type TCoupon = {
  _id?: string;
  name: string;
  couponCode?: string;
  expires: Date;
  freeShipping: boolean;
  discountType?: string;
  discountOff?: number;
  minimumPurchaseAmount?: number;
  image: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

// ============================ Promotions =============================== //

export type TPromotions = {
  status: string;
  data: TPromotion[];
};

export type TPromotion = {
  _id?: string;
  name: string;
  promotionOn?: string;
  categoryName: string;
  expires: string;
  freeShipping?: boolean;
  discountType?: string;
  discountOff?: number;
  minimumPurchaseAmount?: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  ___v?: number;
};

// ============================ React Select Options =============================== //

export type TOptionSelect = {
  value: string;
  label: string;
};
