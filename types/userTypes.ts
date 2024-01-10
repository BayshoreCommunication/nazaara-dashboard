export interface UserData {
  _id: string;
  fullName: string;
  gender?: string;
  email: string;
  password?: string;
  phone?: string;
  refund?: number;
  imageUrl?: string;
  userType: "user" | "admin";
  addressBook: string[];
  createdAt: Date;
  updatedAt: Date;
}
