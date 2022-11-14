import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

import classes from "./post-content.module.css";
import PostHeader from "./post-header";

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  // 일반 마크다운 텍스트를 렌더링이 가능한 JSX코드로 바꿔야함
  // npm i markdown 설치 >> 이 패키지는 마크다운을 JSX로 변환하여 출력해준다.

  return (
    // 게시물은 마크다운으로 불러온다.
    // 마크다운이란 어노테이션이 들어간 텍스트
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown children={post.content} />
    </article>
  );
}

export default PostContent;
