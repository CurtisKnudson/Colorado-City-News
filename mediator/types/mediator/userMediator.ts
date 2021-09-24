import { User } from "types/user";

export interface UserMediator {
  getUserByEmail(email: string): Promise<User>;
  updateUserProfile(userProfileData: User): Promise<User>;
}
