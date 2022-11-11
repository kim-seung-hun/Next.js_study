import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitForHandler = (e) => {
    e.preventDefault();

    const enterEmail = emailInputRef.current.value;
    const enterfeedback = feedbackInputRef.current.value;

    const reqBody = { email: enterEmail, text: enterfeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      // json 형태로 보낼것이라고 알려줌
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitForHandler}>
        <div>
          <lable htmlFor="email">Your Email Address</lable>
          <input id="email" type="email" ref={emailInputRef} />
        </div>
        <div>
          <lable htmlFor="feedback">Your feedback</lable>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>send feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((v) => (
          <li key={v.id}>{v.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
