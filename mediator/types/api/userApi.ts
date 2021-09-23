import { User } from "types/user";

export interface UserApi {
  getUserByEmail(email: string): Promise<User>;
  completeUserProfile(userProfileData: User): Promise<any>;
}
