import { hashPassword } from "../../../lib/auth";
import { connectDatabases } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input!" });
    return;
  }

  const client = await connectDatabases();

  const db = client.db();

  // 해당 이메일 사용자가 있는지 알아야함
  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exist!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
