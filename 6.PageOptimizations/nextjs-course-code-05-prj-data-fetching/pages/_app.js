import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        {/* 이 meta 태그는 반응형 페이지의 스케일을 적정값으로 만드는데 자주 쓰이는 태그입니다. */}
        <meta
          name="viewport"
          content="initial-scale=1.0 , width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
