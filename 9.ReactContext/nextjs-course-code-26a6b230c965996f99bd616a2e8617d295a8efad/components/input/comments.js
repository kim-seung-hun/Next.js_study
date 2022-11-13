import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComment, setIsFetchingComment] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    useEffect(() => {
      if (showComments) {
        setIsFetchingComment(true);
        fetch("/api/comment" + eventId)
          .then((res) => res.json())
          .then((data) => {
            setComments(data.comment);
            setIsFetchingComment(false);
          });
      }
    }, [showComments]);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registeing for newsletter.",
      status: "pending",
    });

    // send data to API
    fetch("/api/comment" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        res.json().then((data) => {
          throw new Error(data.message);
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success.",
          message: "Success.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error.",
          message: "Error.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComment && <CommentList items={comments} />}
      {showComments && isFetchingComment && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
