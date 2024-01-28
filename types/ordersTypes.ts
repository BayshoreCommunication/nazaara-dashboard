export interface IOrders {
  success: boolean;
  total: number;
  data: IOrderData[];
}

export interface IOrdersById {
  success: boolean;
  data: IOrderData;
}

export interface IOrderData {
  _id?: string;
  shippingAddress: IOrderShippingAddress;
  transactionDetails?: IOrderTransactionDetails;
  transactionId: string;
  paymentMethod: string;
  shippingMethod: string;
  subTotal: number;
  vatIncluded: number;
  coupon?: any;
  shippingCharge: number;
  totalAmount: number;
  discountAmount: number;
  advancePay: number;
  totalPay: number;
  due: number;
  user?: any;
  product: IOrderProduct[];
  paymentStatus: string;
  deliveryStatus: string;
  cardId?: any;
  createdAt?: Date;
  remark?: string;
  updateHistory?: [{ updatedBy: string; updatedAt: Date }];
}

export interface IOrderShippingAddress {
  fullName: string;
  phone: string;
  street?: string;
  country: string;
  city: string;
  postalCode?: string;
  details?: string;
}
export interface IOrderTransactionDetails {
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

export interface IOrderProduct {
  _id?: string;
  productDetails: any;
  slug: string;
  sku: string;
  title: string;
  imgUrl: string;
  quantity: number;
  color: string;
  size: string;
  sizeChart?: any;
}

export interface IOrderSizeChart {
  tops: ITops;
  bottom: IBottom;
  _id: string;
  topType: string;
  bottomType: string;
  note: string;
}

export interface ITops {
  chest: number;
  waist: number;
  hip: number;
  end: number;
  armHole: number;
  sleeveLength: number;
  muscle: number;
  handOpening: number;
  length: number;
  slit: number;
  neckDeepf: number;
  neckDeepb: number;
  halfBody: number;
}

export interface IBottom {
  length: number;
  waist: number;
  hip: number;
  thigh: number;
  knee: number;
  legOpening: number;
}
