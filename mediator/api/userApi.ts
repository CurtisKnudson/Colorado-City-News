import { UserApi as UserApiInterface } from "mediator/types/api";
import { config } from "@constants/config";
import { User } from "types/user";
import { delayWithValue } from "@utils/delayValue";

const url = config.url.API_URL;
export class UserApi implements UserApiInterface {
  async getUserByEmail(email: string) {
    let postUrl = `${url}/api/user/email`;
    let postObject = {
      method: "GET",
      headers: {
        body: email,
      },
    };

    const user: User = await fetch(postUrl, postObject).then((res) =>
      res.json()
    );

    return user;
  }
}
