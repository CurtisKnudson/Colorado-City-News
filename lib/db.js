import crypto from "crypto";

import { connectToDatabase } from "../utils/mongodb";

export function getAllUsers(req) {
  // For demo purpose only. You are not likely to have to return all users.
  return req.session.users;
}

export async function createUser(user) {
  const { db } = await connectToDatabase();
  const { firstName, lastName, email, password } = user;
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const hashedUser = {
    id: Math.random() * 1000,
    createdAt: Date.now(),
    firstName,
    lastName,
    email,
    hash,
    salt,
  };

  await db.collection("users").insertOne(hashedUser);
  return;
}

export async function findUserByEmail(email) {
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({
    email,
  });
  console.log(user);
  return user;
}

export function updateUserByUsername(req, username, update) {
  // Here you update the user based on id/username in the database
  // const user = await db.updateUserById(id, update)
  const user = req.session.users.find((u) => u.username === username);
  Object.assign(user, update);
  return user;
}

export function deleteUser(req, username) {
  // Here you should delete the user in the database
  // await db.deleteUser(req.user)
  req.session.users = req.session.users.filter(
    (user) => user.username !== req.user.username
  );
}

// Compare the password of an already fetched user (using `findUserByUsername`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
