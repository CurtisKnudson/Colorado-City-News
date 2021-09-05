import { delayWithValue } from "@utils/delayValue";
import { UserApi } from "mediator/types/api";
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

  async completeUserProfile(userProfileData: {
    email: string;
    name: string;
    image: string;
  }) {
    return delayWithValue(userProfileData);
  }

  dispose() {}
}
