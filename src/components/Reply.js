import { Fragment, useState } from "react";
import classes from "./Reply.module.css";

import replyIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import minusIcon from "../assets/icon-minus.svg";
import plusIcon from "../assets/icon-plus.svg";
import EditIcon from "../assets/icon-edit.svg";

import data from "../data/data.json";
import DeleteModal from "../UI/DeleteModal";
import CommentForm from "./CommentForm";

const Reply = (props) => {
  const [isCurrentUser, setIsCurrentUser] = useState(
    data.currentUser.username === props.username
  );
  const [isReplying, setIsReplying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDeleteModal = () => {
    setShowModal(!showModal);
  };
  const deleteHandler = (id) => {
    props.onDeleteReply(id);
    setShowModal(false);
  };

  const replyHandler = (text) => {
    props.onAddReply(text);
    console.log("reply");
    setIsReplying(false);
  };

  let actionArea;
  if (isCurrentUser) {
    actionArea = (
      <div className={classes.btnSection}>
        <button
          className={`${classes.actionBtn} ${classes.deleteBtn}`}
          onClick={toggleDeleteModal}
        >
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
      <button className={classes.actionBtn} onClick={() => setIsReplying(true)}>
        <img src={replyIcon} alt="replyicon" />
        Reply
      </button>
    );
  }

  return (
    <Fragment>
      {showModal && (
        <DeleteModal
          onAction={toggleDeleteModal}
          onDelete={deleteHandler.bind(this, props.id)}
        />
      )}
      <li className={classes.box}>
        <div className={classes.topBox}>
          <img
            src={props.img}
            alt={`propic of ${props.username}`}
            className={classes.avatar}
          />
          <p className={classes.username}>{props.username}</p>
          {isCurrentUser ? <div className={classes.patch}>you</div> : ""}
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
      {isReplying && (
        <CommentForm
          onAddReply={replyHandler}
          type="reply"
          username={props.username}
        />
      )}
    </Fragment>
  );
};

export default Reply;
