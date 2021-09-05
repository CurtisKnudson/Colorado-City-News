import { User } from "types/user";

export interface UserMediator {
  getUserByEmail(email: string): Promise<User>;
  updateUser(img: string, email: string): Promise<User>;
}
