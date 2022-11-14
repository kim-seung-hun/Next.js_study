import classes from "./main-navigation.module.css";

// 자동 데이터 사전 페칭 기능과 페이지가 한번 로딩되고 나면 단일 페이지 앱에 머물 수 있는 기능
import Link from "next/link";

import Logo from "./logo";

function MainNavigation() {
  return (
    <header className={classes.header}>
      {/* Link에 입력하는 자식이 일반 텍스트가 아닐 경우
            즉, Link에 컴포넌트나 다른 HTML 콘텐츠를 입력할 때에는 
            Link가 기본값으로 앵커태그를 렌더링 하지 않는다. 일반텍스트를 
            입력했을때에만 앵커태그를 렌더링 한다.
            이럴땐 따로 앵커태그를 추가해야한다. */}
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
