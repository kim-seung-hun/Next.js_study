// 브라우저 측 JS가 파일시스템에 접근할 수 없기 때문에
// 클라이언트 사이드에서는 fs 모듈 작업이 안된다.
import fs from "fs/promises";
import path from "path";

import Link from "next/link";
// Next.js는 모든 페이지를 사전 생성한다.
// 동적페이지는 그렇지 않다.([].js) 기본동작으로 페이지를 사전 생성하지 않는다.
// 동적페이지는 하나가 아니라 여러 페이지로 이루어지기 떄문이다.
// Next.js는 사전에 동적 페이지를 위해서 많은 페이지를 미리 생성해야하는지 알지 못한다.
// [pid].js에 어떤 값이 지원되는지 알지 못한다.
// 그런것을 모르니 동적페이지는 기본적으로 사전 생성되지 못하고 서버에서 항상 그떄그때 생성된다.
// 지금은 getStaticProps를 추가한 상태라 작동되지 않는다.
// 우리는 Next.js에 어떤 경로가 생성되어야 하는지 동적페이지에서 어떤 인스턴스가 사전 생성되어야하는지 알려줄수 있다.
// 또 어떤 동적 세그먼트 값을 사용할수 있는지 알아야한다. 그리고 어떤 값에 대한 페이지가 사전 생성되어야 하는지 알아야
// Next.js가 그 페이지의 여러 인스턴스를 사전 생성할 수 있게 된다.
// getStaticPaths함수를 사용해서 알려준다.

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((v) => (
        <li key={v.id}>
          <Link href={`/products/${v.id}`}>{v.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// 페이지가 로드된 후에만 클라이언트 사이드에서 전송되는 HTTP 요청대신,
// 이 컴포넌트를 생성하기 전에 그리고 Next.js가 이 컴포넌트 페이지를 사전 렌더링하기 전 데이터를 프리페치해야 한다.
// 페이지가 준비될때 데이터를 로드해야함
// 이 함수에서는 항상 props 키가 있는 객체를 반환해야한다.
// 이 함수가 하는 일은 컴포넌트에 대한 프로퍼티를 준비하는 것이다. (즉 컴포넌트의 props 객체를 준비하는것이다)
// 첫번째로 getStatic함수를 실행하고, 두번째로 컴포넌트를 실행한다.
// 첫번째 단계에선 컴포넌트 함수에 대한 props를 준비하기 떄문이다.
// 그래서 클라이언트 사이드에서는 절대 볼 수 없는 코드로 데이터를 페칭하고, 이 HomePage 컴포넌트에 props를 통해 데이터를 줄 수 있다.
// 이 코드는 클라이언트에서 실행된게 아니라 서버에서 실행됨 >> 서버측 작업을 수행할 수 있음을 의미한다.
// npm start로 배포된 후의 서버에서 실행된다.

// context는 페이지에 대한 추가 정보를 가진 매개변수(동적매개변수)

export async function getStaticProps(context) {
  console.log("regeneration...");
  // process.cwd(현재작업디렏토리) 파일이 루트 폴더에 있는것처럼 취급함
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  // readFileSync는 파일을 동기적으로 읽고 완료될때까지 실행을 차단한다.
  // 반면 readFile은 계속하려면 콜백해야한다.
  // fs로 dummy-backend.json 파일에 엑세스 할 수 있다.
  const jsonData = await fs.readFile(filePath);
  // 일반 자바스크립트 객체로 반환
  const data = JSON.parse(jsonData);

  if (data.products.length === 0) {
    // 패칭에 실패하면 이 작업을 수행한다.
    return { notFound: true };
  }

  // 사용자를 리디렉션 할 수 있다.(데이터 페칭 실패한 경우)
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      products: data.products,
    },
    // 10초 마다 재 생성
    revalidate: 10,
  };
}
// 페이지에 데이터가 정적으로 존재하는 경우 npm run build로 build후 배포하면 되지만,
// 데이터가 변하는 경우 또 build 후 배포하야한다.

// Next.js에 이런 해결법이 있다.
// 첫번째, 페이지를 사전에 빌드하지만 서버에서 업데이트된 데이터 페칭을 위해 useEffect를 사용하는 React 컴포넌트에 표준 React 코드를 포함한다.
// 즉, 항상 사전 렌더링 된 데이터 일부 포함해 페이지르 제공하지만, 백그라운드에서 데이터를 페칭한 후 그 데이터가 도착한 후에 로드된 페이지를 업데이트 한다.

// ISR(Increament Static Generation) : 페이지를 빌드할때 정적으로 한번만 생성하는 것이 아니라 배포 후에도 재 배포없이 계속 업데이트된다.

// npm run build를 실행하면 전체 프로젝트가 프로덕션을 위해 준비되고 Next.js가 페이지를 사전 렌더링할 뿐 아니라
// 증분 정적 생성(ISR)도 수행한다.
// 이제 npm start로 컴퓨터에서 로컬로 구축된 웹사이트를 실행할수 있다.

export default HomePage;
