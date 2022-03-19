import { useRef } from "react";

import CurrentUser from "./User/CurrentUser";

import classes from "./CommentForm.module.css";

const CommentForm = (props) => {
  const textRef = useRef();
  console.log(props);

  const submitHandler = (e) => {
    e.preventDefault();
    if (textRef === "") {
      console.log("err");
      return;
    }

    props.onAddComment(textRef);
    textRef.current.value = "";
  };

  return (
    <form className={classes.commentForm} onSubmit={submitHandler}>
      <textarea
        ref={textRef}
        className={classes.input}
        placeholder="Add a comment..."
      ></textarea>
      <div className={classes.action}>
        <CurrentUser request="avatar" />
        <button className={classes.submitBtn}>Send</button>
      </div>
    </form>
  );
};

export default CommentForm;
