import { Fragment } from "react";

import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

// 매 요청마다 모든 게시물을 가져올 필요가 없다
// 대부분의 게시물에 대한 변경이 없을테니 getStaticProps가 좋은 방법이다.
export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
}

export default HomePage;

// 1) Hero : 환영 섹션으로 주요 상품을 소개함
// 2) Feature Posts : 임시로 더미 콘텐츠를 표시해 출력 한다. 추후 실제 게시물이 추가되면 더미와 교체한다
