import { useState } from "react";

import Reply from "./Reply";
import DeleteModal from "../UI/DeleteModal";

import classes from "./Comment.module.css";

import replyIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import minusIcon from "../assets/icon-minus.svg";
import plusIcon from "../assets/icon-plus.svg";
import EditIcon from "../assets/icon-edit.svg";
import { Fragment } from "react";

import data from "../data/data.json";
import CommentForm from "./CommentForm";

const Comment = (props) => {
  const [isReplying, setIsReplying] = useState(false);
  const [areReplies, setAreReplies] = useState(props.replies !== []);
  const [showModal, setShowModal] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(
    data.currentUser.username === props.username
  );

  const replyHandler = () => {
    setIsReplying(true);
  };

  const toggleDeleteModal = () => {
    console.log("ciao");
    setShowModal(!showModal);
  };

  let actionArea;
  if (isCurrentUser) {
    actionArea = (
      <div>
        <button className={classes.deleteBtn} onClick={toggleDeleteModal}>
          <img src={deleteIcon} />
          Delete
        </button>
        <button className={classes.actionBtn}>
          <img src={EditIcon} />
          Edit
        </button>
      </div>
    );
  } else {
    actionArea = (
      <button className={classes.actionBtn} onClick={replyHandler}>
        <img src={replyIcon} alt="replyicon" />
        Reply
      </button>
    );
  }

  return (
    <Fragment>
      {showModal && <DeleteModal onAction={toggleDeleteModal} />}
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
      {isReplying && <CommentForm />}
      <ul className={classes.replySection}>
        {areReplies &&
          props.replies.map((reply) => {
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
