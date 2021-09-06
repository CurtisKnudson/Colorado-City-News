export interface User {
  _id?: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt?: string;
  emailVerified?: string;
  updatedAt?: string;
}
