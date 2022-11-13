import { connectDatabases, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // 이메일의 유효성 검사 실패
    if (!userEmail || !userEmail.include("@")) {
      req.status(422).json({ message: "Invalidate email address!" });
      return;
    }

    let client;

    try {
      client = await connectDatabases();
    } catch (error) {
      res.status(500).json({ message: "fail!" });
      return;
    }

    try {
      await insertDocument(client, "newletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "fail!" });
      return;
    }

    // 이메일 유효성 검사 성공
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
