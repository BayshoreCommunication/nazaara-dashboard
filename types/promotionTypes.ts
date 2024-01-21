export interface IPromotions {
  success: boolean;
  data: IPromotion[];
}

export interface IPromotion {
  _id?: string;
  title: string;
  promotionOn: string;
  categoryId?: string[];
  subCategoryId?: string[];
  startDate: Date;
  expireDate: Date;
  freeShipping: boolean;
  discountType: string;
  discountOff: number;
  status: string;
  validPromotion?: boolean;
}
