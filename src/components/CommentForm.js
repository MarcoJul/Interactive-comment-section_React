import CurrentUser from "./User/CurrentUser";

import classes from "./CommentForm.module.css";

const CommentForm = () => {
  return (
    <div className={classes.commentForm}>
      <textarea
        className={classes.input}
        placeholder="Add a comment..."
      ></textarea>
      <div className={classes.action}>
        <CurrentUser request="avatar" />
        <button className={classes.submitBtn}>Send</button>
      </div>
    </div>
  );
};

export default CommentForm;
