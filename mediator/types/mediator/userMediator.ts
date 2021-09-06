import { User } from "types/user";

export interface UserMediator {
  getUserByEmail(email: string): Promise<User>;
  completeUserProfile(userProfileData: User): Promise<any>;
}
