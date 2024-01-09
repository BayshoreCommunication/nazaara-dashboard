export interface ShippingAddress {
  fullName: string;
  phone: string;
  street?: string;
  city: string;
  country: string;
  postalCode?: string;
  details?: string;
}

export interface ProductDetails {
  productDetails: string; // Assuming this is a unique identifier for a product
  title: string;
  sku: string;
  slug: string;
  imgUrl: string;
  quantity: number;
  color: string;
  size: string;
  sizeChart?: string; // Assuming this is a unique identifier for a size chart
}

export interface TransactionDetails {
  bankTranId?: string;
  cardType?: string;
  cardNo?: string;
  cardIssuer?: string;
  cardBrand?: string;
  cardCategory?: string;
  cardIssuerCountry?: string;
  cardIssuerCountryCode?: string;
  currencyType?: string;
  tranDate?: string;
}

export interface Order {
  transactionId: string;
  paymentMethod: "partial-payment" | "full-payment";
  shippingMethod: string;
  shippingAddress: ShippingAddress;
  remark?: string;
  subTotal: number;
  vatIncluded?: number;
  coupon?: string; // Assuming this is a unique identifier for a coupon
  shippingCharge: number;
  totalAmount: number;
  discountAmount?: number;
  advancePay?: number;
  totalPay?: number;
  due?: number;
  user: string; // Assuming this is a unique identifier for a user
  product: ProductDetails[];
  transactionDetails: TransactionDetails;
  paymentStatus:
    | "pending"
    | "partial request"
    | "full request"
    | "partial successful"
    | "full successful"
    | "cancel";
  deliveryStatus:
    | "pending"
    | "order received"
    | "on process"
    | "ready to deliver"
    | "shipped"
    | "delivered";
  cartId?: string[];
  createdAt: string;
  updatedAt: string;
}
