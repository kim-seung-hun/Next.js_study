// post 데이터 페칭과 마크다운 파일로부터 메타데이터를 추출할때 쓸 용도
// npm i gray-matter
// 이 패키지를 이용해서 마크다운 파일을 읽어들이고, 이를 메타데이터와 실제 마크다운 콘텐츠로 구분할것이다.

import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postDirectory);
}

export function getPostData(postIdentifier) {
  // 파일확장자는 빈문자열로 대체 된다.
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // matter라는 두개의 프로퍼티를 갖는 하나의 객체를 반환한다.
  // 메타데이터에 대한 data 프로퍼티(메타데이터가 포함되어있는 data 프로퍼티)를 객체로 반환하고,
  // 실제 콘텐츠가 있는 content 프로퍼티(마크다운 텍스트)를 문자열로 반환
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  // readdirSync는 모든 콘텐츠를 동기식으로 읽는다
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const FeaturedPosts = allPosts.filter((post) => post.isFeatured);

  return FeaturedPosts;
}
