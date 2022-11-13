import classes from "./newsletter-registration.module.css";
import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registeing for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
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
          title: "Success",
          message: "Successfully for newsletter.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something error!",
          status: "error",
        });
      });
  }

  // fetch user input (state or refs)
  // optional: validate input
  // send valid data to API
}

return (
  <section className={classes.newsletter}>
    <h2>Sign up to stay updated!</h2>
    <form onSubmit={registrationHandler}>
      <div className={classes.control}>
        <input
          type="email"
          id="email"
          placeholder="Your email"
          aria-label="Your email"
          ref={emailInputRef}
        />
        <button>Register</button>
      </div>
    </form>
  </section>
);

export default NewsletterRegistration;
