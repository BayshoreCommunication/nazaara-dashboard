export interface IOrders {
  status: string
  total: number
  data: IOrderData[]
}

export interface IOrdersById {
    status: string
    data: IOrderData[]
  }

export interface IOrderData {
  shippingAddress: IOrderShippingAddress
  _id: string
  paymentId: string
  quantity: number
  paymentMethod: string
  remark: string
  totalCost: number
  coupon: string
  product: IOrderProduct
  user?: IOrderUser
  sizeChart: IOrderSizeChart
  paymentStatus: string
  deliveryStatus: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IOrderShippingAddress {
  street: string
  city: string
  state: string
  country: string
  zip: number
  phoneNumber: string
}

export interface IOrderProduct {
  _id: string
  slug: string
  productName: string
  regularPrice: number
  salePrice: number
  category: string
}

export interface IOrderUser {
  _id: string
  fullName: string
  email: string
  phone: string
  refund: number
}

export interface IOrderSizeChart {
  tops: ITops
  bottom: IBottom
  _id: string
  topType: string
  bottomType: string
  note: string
}

export interface ITops {
  chest: number
  waist: number
  hip: number
  end: number
  armHole: number
  sleeveLength: number
  muscle: number
  handOpening: number
  length: number
  slit: number
  neckDeepf: number
  neckDeepb: number
  halfBody: number
}

export interface IBottom {
  length: number
  waist: number
  hip: number
  thigh: number
  knee: number
  legOpening: number
}
