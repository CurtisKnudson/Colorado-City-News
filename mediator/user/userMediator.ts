import { Api } from "types/api";
import { MediatorInterface } from "types/mediator/mediator";
import { User } from "types/user";

export class Mediator implements MediatorInterface {
  private api: Api;

  constructor(api: Api) {
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
