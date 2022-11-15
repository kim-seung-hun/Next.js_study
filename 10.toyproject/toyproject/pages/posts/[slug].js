// 슬러그 - 각 게시물에 대해서 쉽게 이해할 수 있고, 검색엔진에 최적화되어 있는 슬러그 식별자를 찾을수 있다

import Head from "next/head";
import { Fragment } from "react";

import PostContent from "../../components/posts/post-detail/post-content.js";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />;
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

// 동적페이지에서 getStaticProps는 단독으로 작동할 수 없다
// getStaticPaths와 짝을 맞춰야 NextJS가 미리 생성해야하는 구체적인 slug 값을 알 수 있다.
export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  // 모든 파일 이름을 슬러그 문자열로 매핑
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    // 미리 생성해야 하는 slug의 구체적인 값을 갖고 있다
    // 경로는 객체로 채워진 배열이다
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
