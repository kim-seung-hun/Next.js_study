import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // fallback:true일때 상태 반환
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // Next.js에서 제공하는 기능
  const { params } = context;

  // 컴포넌트함수와 getStaticProps의 매개변수를 추출할때 차이점이 있다.
  // 컴포넌트 함수에서 매개변수를 추출하면 컴포넌트 내부에서 사용 가능하다.(이 과정은 브라우저에서만 이루어진다)
  // getStaticProps로 데이터를 준비하여 페이지를 사전 렌더링하게 되면 이 경우엔 서버에서 이루어진다.
  // getStaticProps는 컴포넌트 함수보다 먼저 실행된다.
  // getStaticProps 내부의 동적 경로 세그먼트에 엑세스해서 매개변수 데이터를 통해 컴포넌트에 대한 데이터를 준비해야한다.
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { noFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 동적페이지의 어떤 인스턴스를 생성할지 Next.js에 알리는것이다.
// 이렇게 하면 동적페이지가 세번 사전 생성되어야 하며
// 세가지 값을 가진다는 사실을 Next.js에 알릴 수 있다.
// 이 값들은 동적세그먼트 식별자에 대한 값이다.

// getStaticPaths는 동적페이지의 어떤 구체적인 인스턴스를 사전 생성할지 알려주는 함수이다.
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((v) => v.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathWithParams,
    // fallback키는 사전에 생성되어야할 페이지가 많을때 도움이 된다.
    // 많은 페이지를 사전에 생성하려면 시간이 오래걸린다.
    // fallback을 true로 설정하면 paths에 포함되지 않은 페이지라도, 즉 pid 매개변수에 대한 값이 없더라도
    // 페이지 방문 시 로딩되는 값이 유효할 수 있도록 Next.js에 요청할 수 있다.
    // 다만 사전 생성되는건 아니고, 요청이 서버에 도달하는 시점에 생성된다.
    // 이렇게 재방문율이 높은 페이지를 사전 생성할수 있게 되며, 방문율이 적은 페이지를 서버에 생성하는 것을 미뤄서 필요한 경우에만 사전 생성할수 있다.
    // 여기서 문제점은 링크를 클릭해서 들어갈순 있지만, URL에 직접입력해서 들어가는건 안된다.
    // 그 이유는 동적 사전 생성 기능이 즉시 끝나지 않기 때문이다.
    // 따라서 fallback 기능을 쓰려면 컴포넌트에서 fallback 상태를 반황할 수 있게 해줘야한다.
    fallback: true,

    // 문자열 값으로 설정한 경우엔 컴포넌트에서 fallback 확인을 할 필요가 없다.
    // fallback: "blocking",
  };
}

export default ProductDetailPage;
