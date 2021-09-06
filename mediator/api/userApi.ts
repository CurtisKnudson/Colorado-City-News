import { UserApi as UserApiInterface } from "mediator/types/api";
import { config } from "@constants/config";
import { User } from "types/user";
import { delayWithValue } from "@utils/delayValue";

const url = config.url.API_URL;
export class UserApi implements UserApiInterface {
  async getUserByEmail(email: string) {
    let getUrl = `${url}/api/user/email`;
    let getObject = {
      method: "GET",
      headers: {
        body: email,
      },
    };
    const user: User = await fetch(getUrl, getObject).then((res) => res.json());
    return user;
  }

  async completeUserProfile(userProfileData: User) {
    let postUrl = `${url}/api/user/update`;
    let postObject = {
      method: "POST",
      body: JSON.stringify(userProfileData),
    };

    const completedUser = await fetch(postUrl, postObject).then((res) =>
      res.json()
    );

    return completedUser;
  }
}
