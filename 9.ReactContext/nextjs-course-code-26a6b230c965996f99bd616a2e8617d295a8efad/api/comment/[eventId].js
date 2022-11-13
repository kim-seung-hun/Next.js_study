import { MongoClient } from "mongodb";
import {
  connectDatabases,
  insertDocument,
  getAllDocument,
} from "../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabases();
  } catch (error) {
    res.status(500).json({ message: "connecting fail!" });
    return;
  }

  if (req.method === "POST") {
    // 새로운 댓글 데이터를 받는다.
    // 클라이언트 사이드 유효성 검사를 믿을수 없기때문에,
    // 여기에 서버사이드 유효성 검사를 추가해서 입력 데이터가 맞는지 확인한다.

    const { email, name, text } = req.body;

    if (
      email.include("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comment", newComment);
      newComment._id = result.insertedId;
      res.status(202).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "fail" });
    }
  }

  if (req.method === "GET") {
    try {
      const documnet = await getAllDocument(client, "comment", { _id: -1 });
      res.status(200).json({ comment: documnet });
    } catch (error) {
      res.status(500).json({ message: "fail!" });
      return;
    }
  }

  client.close();
}

export default handler;
