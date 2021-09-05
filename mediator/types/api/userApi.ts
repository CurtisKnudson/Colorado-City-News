import { User } from "types/user";

export interface IUserApi {
  getUserByEmail(email: string): Promise<User>;
}
