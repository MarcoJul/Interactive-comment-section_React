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
  const [score, setScore] = useState(props.score);
  const [scoreModified, setSCoreModified] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [text, setText] = useState(props.text);

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
  const submitEditHandler = (e) => {
    e.preventDefault();
    setText(e.target.text.value);
    setIsEdit(false);
  };

  const voteHandler = (action) => {
    if (scoreModified) return;
    if (action === "up") {
      setScore((prevScore) => prevScore + 1);
      setSCoreModified(true);
    } else if (action === "down") {
      setScore((prevScore) => prevScore - 1);
      setSCoreModified(true);
    } else {
      return;
    }
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
        <button
          className={classes.actionBtn}
          onClick={() => {
            setIsEdit(true);
          }}
        >
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
          {!isEdit ? (
            <p className={classes.text}>
              <span className={classes.replyingTo}>@{props.replyingTo}</span>
              {text}
            </p>
          ) : (
            <form id="editForm" onSubmit={submitEditHandler}>
              <input placeholder="Text" name="text" defaultValue={text} />
            </form>
          )}
        </div>
        <div className={classes.actions}>
          <div className={classes.voteBox}>
            <button
              className={classes.voteBtn}
              onClick={voteHandler.bind(this, "up")}
            >
              <img src={plusIcon} alt="plusIcon" />
            </button>
            <span className={classes.score}>{score}</span>
            <button
              className={classes.voteBtn}
              onClick={voteHandler.bind(this, "down")}
            >
              <img src={minusIcon} alt="minusIcon" />
            </button>
          </div>
          {isEdit ? (
            <button className={classes.submitBtn} form="editForm">
              U
            </button>
          ) : (
            actionArea
          )}
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
