import { IUserApi } from "mediators/types";

export class UserMediator {
  private api: IUserApi;
  constructor(api: IUserApi) {
    this.api = api;
  }

  getUserByEmail(email: string) {
    this.api.getUserByEmail(email).then((res: string) => {
      return res;
    });
  }
}
