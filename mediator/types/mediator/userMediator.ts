import { User } from "types/user";

export interface UserMediator {
  getUserByEmail(email: string): Promise<User>;
  completeUserProfile(userProfileData: {
    email: string;
    name: string;
    image: string;
  }): Promise<any>;
}
