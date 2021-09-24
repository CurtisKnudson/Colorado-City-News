import { UserApi } from "mediator/types/api";
import { User } from "types/user";
import { UserMediator as UserMediatorInterface } from ".";

export class UserMediator implements UserMediatorInterface {
  private api: UserApi;

  constructor(api: UserApi) {
    this.api = api;
  }

  async getUserByEmail(email: string) {
    const res = await this.api.getUserByEmail(email);
    return res;
  }

  async updateUserProfile(userProfileData: User) {
    const res: User = await this.api.updateUserProfile(userProfileData);
    return res;
  }

  dispose() {}
}
