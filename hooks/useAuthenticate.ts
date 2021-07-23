import { Magic } from "magic-sdk";
import { useRouter } from "next/router";

interface UserAuthenticate {
  email: string;
  firstName?: string;
  lastName?: string;
}
export const useAuthenticate = async (user: UserAuthenticate) => {
  try {
    const magic = new Magic(process.env.MAGIC_PUBLISHABLE_KEY);
    const didToken = await magic.auth.loginWithMagicLink({
      email: user.email,
    });
    const res = await fetch("/api/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.error("An unexpected error has occurred", error);
  }
};
