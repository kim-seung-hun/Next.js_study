import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((v) => (
        <li key={v._id}>
          <p>{v.text}</p>
          <div>
            By <address>{v.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
