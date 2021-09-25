import { config } from "@constants/config";
import { ApiInterface } from "types/api";
import { User } from "types/user";

const url = config.url.API_URL;
export class Api implements ApiInterface {
  async getUserByEmail(email: string) {
    let getUrl = `${url}/user/email`;
    let getObject = {
      method: "GET",
      headers: {
        body: email,
      },
    };
    const user: User = await fetch(getUrl, getObject).then((res) => res.json());
    return user;
  }

  async updateUserProfile(userProfileData: User) {
    let postUrl = `${url}/user/update`;
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
