// 일반적인 페이지 구조를 정의할수 있도록 도와준다.
// HTML 요소 그 자체에 속성을 설정하거나,
// React Portal과 함께 사용할 진입 지점 등의 요소를 추가한다

// _document.js 파일을 실행하려면 서버를 종료했다가 npm run dev를 해야한다.

// 방문자가 볼 수 있게 페이지를 시각적으로 준비할 뿐만 아니라 올바른 메타데이터를 설정할 수 있게 된다.

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* notification 컴포넌트가 렌더링 될 때 여기로 연결한다 */}
          <div id="notification"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
