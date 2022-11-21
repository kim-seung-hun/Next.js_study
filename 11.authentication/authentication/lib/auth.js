import { hash } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = hash(password, 12);
  return hashPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}
