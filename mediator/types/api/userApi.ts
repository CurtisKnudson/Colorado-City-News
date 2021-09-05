import { User } from "types/user";

export interface UserApi {
  getUserByEmail(email: string): Promise<User>;
  updateUser(img: string, email: string): Promise<any>;
}
