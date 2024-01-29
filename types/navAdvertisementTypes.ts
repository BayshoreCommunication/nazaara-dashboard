export type TNavAdvertisements = {
  success: boolean;
  message: string;
  data: TNavAdvertisement[];
};

export type TNavAdvertisement = {
  _id?: string;
  imageUrl: string;
  link: string;
  category: any;
  status: string;
};
