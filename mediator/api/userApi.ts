import { delayWithValue } from "@utils/delayValue";
import { IUserApi } from "mediators/types";
export class UserApi implements IUserApi {
  getUserByEmail(email: string) {
    return delayWithValue(email);
  }
}
