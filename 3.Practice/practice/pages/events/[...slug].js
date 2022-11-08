import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";

function FilteredEventsPage() {
  // 이를 통해 슬러그 페이지에서도 URL에 부호화된 데이터에 엑세스할 수 있다.
  const router = useRouter();

  // ex) ['2021' , '5']
  // undefined도 나오는데, 이는 컴포넌트가 두번 렌더링되었기 때문이다.
  // 리액트 작동 방식과 라우트 데이터의 추출방식이 그 이유다.
  // 실질적으로 라우트 데이터를 추출하는 이 훅은 본 컴포넌트가 첫번째 렌더링을 마친 후에 실행된다.
  // 즉 컴포넌트가 처음 렌더링될 때는 해당 url 데이터에 대한 엑세스가 없다
  // 해당 url에 대한 엑세스가 생긴 후에 filtered event를 살펴봐야한다.
  const filterData = router.query.slug;

  // 해당 데이터가 정의되지 않았을때
  // 이 컴포넌트가 렌더링되었을때는 자동으로 렌더링이 한번더 일어나겠지만
  // 최초로 렌더링될 때는 filterData가 없는 상태이기 떄문
  if (!filterData) {
    return <p className="center">...Loading</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // URL이 부호화되어 있어 항상 문자열 >> 하지만 우리에게 필요한건 숫자
  // 데이터를 숫자로 변경 가능
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // URL에 입력된 연월이 제대로 되었는지 확인
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 20230 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No evnets found for the chosen filter!</p>;
  }
  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}
export default FilteredEventsPage;
