import classes from "./event-item.module.css";
import Button from "../ui/button";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatteedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formatteedAddress}</address>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        {/* <Link href={exploreLink}>Explore Event</Link> */}
        <Button link={exploreLink}>Explore Event</Button>
      </div>
    </li>
  );
}

export default EventItem;
