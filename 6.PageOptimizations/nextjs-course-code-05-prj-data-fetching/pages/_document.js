// _document.js 는 pages 폴더에 추가해준다.
// 전체 HTML문서를 커스터마이징 해준다.

import Documnet, { Html, Head, Main, NextScript } from "next/document";
// 여기 Head 컴포넌트는 next/head 컴포넌트와는 다르다

// 클래스 기반 컴포넌트여야 하는 이유는 Next.js가 제공하는 일부 구성요소 확장이 필요하기 때문이다.
class MyDocument extends Documnet {
  render() {
    return (
      <Html lnag="en">
        <Head>
          <body>
            {/* HTML 콘텐츠를 앱 컴포넌트 트리 외부에 추가할 수 있게 해준다. 
                이런 요소를 React의 portal과 같이 사용한다거나 할때,
                React portal로 <div>를 선택해 모달이나 오버레이를 이 요소로 전달할 수 있다.
            */}
            <div id="overlays" />
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

export default MyDocument;
