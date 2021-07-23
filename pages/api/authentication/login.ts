import { magic } from "utils/auth/magic";
import { setLoginSession } from "utils/auth/auth";
// types
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.authorization) {
    res.status(400).send("Invalid Authorization in HTTP header");
    return;
  }
  try {
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const session = { ...metadata };

    await setLoginSession(res, session);

    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
