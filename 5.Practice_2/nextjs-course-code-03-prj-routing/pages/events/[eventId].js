import { Fragment } from "react";

import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.seletedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

// context >> 이벤트 데이터를 로딩할 특정 eventId를 알아야 하기 때문
export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      seletedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // 모든 이벤트를 가져와 ID를 추출하고 생성해야하는 경로를 그 ID에서 얻어야한다.
  const events = await getAllEvents();

  // 모든 페이지를 페칭해서 페이지를 전부 사전에 생성하는건 큰 낭비

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,

    // 준비된 페이지보다 더 많을경우
    fallback: true,
  };
}

export default EventDetailPage;
