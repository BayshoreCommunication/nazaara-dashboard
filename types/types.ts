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
// ============ //

export type TErpDataById = {
  id: number;
  Warehouse: number;
  ProductDetails: TProductDetails;
  Color: number;
  Size: number;
  ProductImage: TProductImage[];
  ref_type: string;
  quantity: number;
  purchase_price: string;
  selling_price: string;
  price: string;
  barcode: string;
  data: string;
  BulkProduct: any;
  Custom_one: any;
  Custom_two: any;
  Deatils: TDeatil[];
  is_active: boolean;
  title: string;
  category: string;
  parent_category: string;
  Warehouse_name: string;
  color: string;
  size: string;
  image: TImage3[];
};

export type TImmediateParent = {
  id: number;
  name: string;
  slug: string;
  data: string;
  Category_parent: number;
  title: string;
  key: number;
  value: number;
};

export type TProductImage = {
  id: number;
  photo: string;
  is_active: boolean;
  ProductDetails: number;
  ProductLocation: any;
  Color?: number;
};

export type TDeatil = {
  id: number;
  Category: TCategory2;
  title: string;
  slug: string;
  Short_description: any;
  tags: any;
  stock_unit: string;
  stock_alart_amount: number;
  height: any;
  width: any;
  weight: any;
  discount_type: string;
  discount: string;
  tax: any;
  is_active: boolean;
  product_code: string;
  quantity: number;
  min_price: string;
  max_price: string;
  data: TData2;
  Sub_Category: any;
  Merchandiser: any;
  parent_category: string;
  main_category: string;
  category_name: string;
  cover: TCover2[];
  image: TImage2[];
};

export type TCategory2 = {
  id: number;
  data: string;
  parent: TParent2;
  name: string;
  slug: string;
  Category_parent: number;
  title: string;
  key: number;
  value: number;
  immediate_parent: TImmediateParent2;
};

export type TParent2 = {
  id: number;
  name: string;
  slug: string;
  data: string;
  Category_parent: any;
  title: string;
  key: number;
  value: number;
};

export type TImmediateParent2 = {
  id: number;
  name: string;
  slug: string;
  data: string;
  Category_parent: number;
  title: string;
  key: number;
  value: number;
};

export type TData2 = {
  colors: TColor2[];
  sizes: TSize2[];
  attributes: number[];
};

export type TColor2 = {
  name: string;
  id: number;
  code: any;
  class: string;
};

export type TSize2 = {
  name: string;
  id: number;
  inStock: boolean;
};

export type TCover2 = {
  id: number;
  photo: string;
  is_active: boolean;
  ProductDetails: number;
  ProductLocation: any;
  Color: any;
};

export type TImage3 = {
  id: number;
  photo: string;
  is_active: boolean;
  ProductDetails: number;
  ProductLocation: any;
  Color: number;
};
