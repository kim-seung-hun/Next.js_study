function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// getStaticPaths 함수를 사용하지 않고도 코드가 정상저긍로 작동한 이유는
// 이 코드는 서버에서만 작동하고 Next.js에서는 아무 페이지도 사전 생성할 필요가 없고, 사전 생성할 대상이 없으니
// getStaticPaths 정보가 필요하지 않다.
// 서버사이드코드에서 모든 요청을 처리하기 때문
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userId-" + userId,
    },
  };
}
