// 기존 React의 문제점

// 리액트 앱을 실행한 파일의 데이터 소스를 보면, 본 페이지 소스코드엔 데이터를 찾아볼수 없다

// 사용자들이 데이터가 로딩될떄까지 기다려야한다.
// (백엔드 API를 이용해서 데이터를 페칭하는 실제 페이지에서는 데이터 로딩에 몇초가 소요될 수 있어 지연이 발생한다.)
// (UX 최적화가 아님)

// 검색엔진최적화가 안좋다.
// (구글 검색엔진은 코드를 보는데 코드에 컨텐츠가 없기 떄문에 검색할수 없다)

// 기존 React 앱은 데이터를 페칭하는 일이 컴포넌트가 로딩된 후여야 한다.
// 즉, 클라이언트 사이드에서 데이터를 페칭하고 화면에 렌더링된 후에 서버로 요청을 보낼수 있다.
// 첫번째 응답, 첫번째 HTML 페이지, 사용자가 처음 페이지를 방문했을때, 서버가 클라이언트에게 재전송하는 페이지는 데이터를 포함하고 있찌 않다는 점이 문제가 된다.

// 이러한 점을 Next.js를 통해 극복할수 있다.

// page pre-rendering
// Next.js는 페이지와 필요할법한 모든 데이터가 있는 HTML 콘텐츠를 사전에 렌더링한다.
// 사전에 HTML 페이지를 완성해놓고 완전히 채워진 HTML 파일을 클라이언트, 즉 페이지의 방문자에게 전송한다. SEO 관점에서 훌륭하다
// 사전 렌더링은 오직 최초 로딩때만 영향을 미친다.
// 한번 렌더링이 되면 다시 표준 SPA 앱으로 돌아간다. 이떄부턴 React가 프론트엔드에서 모든 처리를 수행한다.

// Next.js의 두가지 사전 렌더링 방식

// 정적생성(static generation)
// 서버사이드렌더링(SSR)

// SSR은 배포 후 요청이 서버까지 오는 바로 그때 모든 페이지가 생성된다.

// 정적생성(static generation) : 빌드되는 동안 모든 페이지가 사전 생성된다
// 사전생성이란? 콘텐츠를 구성하는 모든 HTML 코드와 모든 데이터를 사전에 준비시켜놓는다
// 사전 생성할 페이지를 지정하는 방법
// 페이지 컴포넌트에서 가져올 수 있는 특정 함수에서 찾을 수 있다.
// 이는 반드시 사용하는 페이지 컴포넌트의 내부에 있어야 하며,
// 다른 React 컴포넌트가 아닌 pages 폴더의 component 파일 내부가 그 위치여야 한다.
// 그 안에서 특수한 비동기 함수인 getStaticProps를 가져온다.

// getStaticProps 함수를 추가하기 전에 중요한 사항!
// 페이지소슬르 보면 React와 다르게 Next.js는 컴포넌트가 반환한 모든 HTML코드와 JSX 코드를 볼수 있다.
// 바로 이 페이지가 Next.js를 통해 사전 렌더링된 페이지다. 어떤 작업도 없이 기본값으로 사전 렌더링 된 것이다.
// 이는 컴토넌트에 부호화하는 모든 콘텐츠를 검색 엔진이 인식하고, 사용자가 웹사이트를 처음부터 볼 수 있다는 점이 아주 훌륭하다

// getStaticProps 함수는 모든 페이지 파일에 추가할 수 있고, 페이지에만 추가할수 있으며 export 해야한다.
// 그렇게 하면 Next.js가 페이지를 사전 생성할 때 사용자를 대신하여 이 getStatic 함수도 호출한다.
// 함수는 이 페이지가 사전 생성되어야 하는 페이지임을 Next.js에게 알려준다.
// Next.js는 기본값으로 모든 페이지를 사전 렌더링하지만, 이후에 Next.js가 페이지를 사전에 렌더링하지 않게 하는 방법을 배운다.
