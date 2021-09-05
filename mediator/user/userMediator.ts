import { delayWithValue } from "@utils/delayValue";
import { UserApi } from "mediator/types/api";
import { UserMediator as UserMediatorInterface } from ".";
import { UserProfileInfo } from "@providers/profile/userProfileProvider";

export class UserMediator implements UserMediatorInterface {
  private api: UserApi;

  constructor(api: UserApi) {
    this.api = api;
  }

  async getUserByEmail(email: string) {
    const res = await this.api.getUserByEmail(email);
    return res;
  }

  async completeUserProfile(userProfileData: UserProfileInfo) {
    const res = await this.api.completeUserProfile(userProfileData);
    return res;
  }

  dispose() {}
}
