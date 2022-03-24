import { useRef } from "react";

import CurrentUser from "./User/CurrentUser";

import classes from "./CommentForm.module.css";

const CommentForm = (props) => {
  const textRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (props.type === "comment") {
      if (textRef === "") {
        console.log("err");
        return;
      }

      props.onAddComment(textRef);
      window.scrollTo({ top: "0", behavior: "smooth" });
      textRef.current.value = "";
    }
    if (props.type === "reply") {
      props.onAddReply(textRef.current.value, props.username);
      textRef.current.value = "";
    }
  };

  return (
    <form className={classes.commentForm} onSubmit={submitHandler}>
      <textarea
        ref={textRef}
        className={classes.input}
        placeholder="Add a comment..."
      />
      <div className={classes.avatar}>
        <CurrentUser request="avatar" />
      </div>
      <button className={classes.submitBtn}>Send</button>
    </form>
  );
};

export default CommentForm;
