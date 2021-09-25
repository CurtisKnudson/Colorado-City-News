import { User } from "types/user";

export interface ApiInterface {
  getUserByEmail(email: string): Promise<User>;
  updateUserProfile(userProfileData: User): Promise<User>;
}
