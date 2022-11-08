import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEventPage() {
  const events = getAllEvents();

  const router = useRouter();

  const findEventHandler = (year, month) => {
    // events 뒤에 path가 하나라면 구체적인 eventId가 실행되겠지만 , 2개라면 ...slug가 실행된다.
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventPage;
