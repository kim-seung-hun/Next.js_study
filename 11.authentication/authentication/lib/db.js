// 이 파일은 데이터베이스로 연결하는 논리를 구성

import { MongoClient } from "mongodb";

export async function connectDatabases() {
  const client = await MongoClient.connect("");

  return client;
}
