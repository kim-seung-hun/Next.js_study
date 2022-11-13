import { MongoClient } from "mongodb";

export async function connectDatabases() {
  const client = await MongoClient.connect(url);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  // 데이터베이스의 테이블과 같은 컬렉션에 접근할수 있다.
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocument(client, collection, sort) {
  // GET요청을 받으면 댓글 목록을 반환해야한다.

  const db = client.db();

  const document = await db.collection(collection).find().sort(sort).toArray();

  return document;
}
