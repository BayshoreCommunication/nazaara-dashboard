export interface ICustomization {
  success: boolean;
  message: string;
  data: IData;
}

export interface IData {
  bannerSection: IBannerSection;
  aboutUs: IAboutUs;
  _id?: string;
  heroLeftSlider: IHeroLeftSlider[];
  heroRightSlider: IHeroRightSlider[];
  deliveryPartnerImages: string[];
  faq: IFaq[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IBannerSection {
  image: string;
  topHeading: string;
  mainHeading: string;
}

export interface IAboutUs {
  ceoData: ICeoData;
  topHeading: string;
  secondText: string;
  thirdText: string;
  otherEmployeesData: IOtherEmployeesDaum[];
}

export interface ICeoData {
  image: string;
  userName: string;
  designation: string;
}

export interface IOtherEmployeesDaum {
  image: string;
  userName: string;
  designation: string;
  _id: string;
}

export interface IHeroLeftSlider {
  image: string;
  topHeading: string;
  mainHeading: string;
  bottomHeading: string;
  _id: string;
}

export interface IHeroRightSlider {
  image: string;
  topHeading: string;
  mainHeading: string;
  _id: string;
}

export interface IFaq {
  title: string;
  answer: string;
  _id?: string;
}
