import { delayWithValue } from "@utils/delayValue";
import { IUserApi } from "mediator/types/api";
export class UserApi implements IUserApi {
  getUserByEmail(email: string) {
    return delayWithValue(email);
  }
}
