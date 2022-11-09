function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// 서버에서만 실행됨
export async function getServerSidePage(context) {
  // 특수헤더나 쿠키 데이터가 필요할때 접근 필요
  const { params, req, res } = context;

  return {
    props: {
      username: "huni",
    },
  };
}
