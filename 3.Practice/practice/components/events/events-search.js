import Button from "../ui/button";
import { useRef } from "react";

function EventsSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const submitHandler = (e) => {
    // 브라우저가 기본값으로 http 요청을 전송하는 일이 없도록 해야한다.
    // 페이지가 새로고침되어 앱 상태가 모두 유실되기 때문이다.
    e.preventDefalut();

    // yearInputRef.cyrrent에 엑세스해서 selectedYear를 얻을 수 있다.
    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    // pages/index.js 파일에 이 함수를 선언해준다
    props.onSearch(selectedYear, selectedMonth);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="year">Year</label>
        <select id="year" ref={yearInputRef}>
          {/* 더미데이터에 년도 값을 찾기 위해 */}
          {/* value 키를 부여해 나중에 엑세스 할 수 있도록 해준다 */}
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div>
        <lable htmlFor="month">Month</lable>
        <select id="month" ref={monthInputRef}>
          <option value="1">1월</option>
          <option value="2">2월</option>
          <option value="3">3월</option>
          <option value="4">4월</option>
          <option value="5">5월</option>
          <option value="6">6월</option>
          <option value="7">7월</option>
          <option value="8">8월</option>
          <option value="9">9월</option>
          <option value="10">10월</option>
          <option value="11">11월</option>
          <option value="12">12월</option>
        </select>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventsSearch;
