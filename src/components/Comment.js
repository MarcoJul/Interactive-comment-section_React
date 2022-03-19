import Reply from "./Reply";

import classes from "./Comment.module.css";

import replyIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import minusIcon from "../assets/icon-minus.svg";
import plusIcon from "../assets/icon-plus.svg";
import EditIcon from "../assets/icon-edit.svg";
import { Fragment } from "react";

import data from "../data/data.json";

const Comment = (props) => {
  const replies = props.replies;
  let areReplies = false;
  if (replies !== []) areReplies = true;

  const currentUserData = data.currentUser;

  let actionArea;
  if (props.username !== currentUserData.username) {
    actionArea = (
      <button className={classes.actionBtn}>
        <img src={replyIcon} alt="replyicon" />
        Reply
      </button>
    );
  } else {
    actionArea = (
      <div>
        <button className={classes.deleteBtn}>
          <img src={deleteIcon} />
          Delete
        </button>
        <button className={classes.actionBtn}>
          <img src={EditIcon} />
          Edit
        </button>
      </div>
    );
  }

  return (
    <Fragment>
      <li className={classes.box}>
        <div className={classes.topBox}>
          <img
            src={props.img}
            alt={`propic of ${props.username}`}
            className={classes.avatar}
          />
          <p className={classes.username}>{props.username}</p>
          <p className={classes.time}>{props.time}</p>
        </div>
        <div className={classes.textbox}>
          <p className={classes.text}>{props.text}</p>
        </div>
        <div className={classes.actions}>
          <div className={classes.voteBox}>
            <button className={classes.voteBtn}>
              <img src={plusIcon} alt="plusIcon" />
            </button>
            <span className={classes.score}>{props.score}</span>
            <button className={classes.voteBtn}>
              <img src={minusIcon} alt="minusIcon" />
            </button>
          </div>
          {actionArea}
        </div>
      </li>
      <ul className={classes.replySection}>
        {areReplies &&
          replies.map((reply) => {
            return (
              <Reply
                img={reply.user.image.png}
                username={reply.user.username}
                time={reply.createdAt}
                text={reply.content}
                id={reply.id}
                key={reply.id}
                score={reply.score}
              />
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Comment;
