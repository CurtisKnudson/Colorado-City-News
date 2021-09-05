import { User } from "types/user";
import { UserProfileInfo } from "@providers/profile/userProfileProvider";

export interface UserMediator {
  getUserByEmail(email: string): Promise<User>;
  completeUserProfile(userProfileData: UserProfileInfo): Promise<any>;
}
