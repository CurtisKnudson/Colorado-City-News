import { User } from "types/user";

export interface IUserMediator {
  getUserByEmail(email: string): Promise<User>;
}
