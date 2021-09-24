import { User } from "types/user";

export interface UserApi {
  getUserByEmail(email: string): Promise<User>;
  updateUserProfile(userProfileData: User): Promise<User>;
}
