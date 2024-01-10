export interface IFestival {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  products: string[];
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}
