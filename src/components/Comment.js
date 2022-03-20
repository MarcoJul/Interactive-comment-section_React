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
  const [replies, setReplies] = useState(props.replies);

  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(props.text);

  const currentUserData = data.currentUser;

  const replyHandler = () => {
    setIsReplying(true);
  };

  const toggleDeleteModal = () => {
    setShowModal(!showModal);
  };

  const deleteHandler = (id) => {
    props.onDelete(id);
    setShowModal(false);
  };

  const deleteReplyHandler = (id) => {
    setReplies((previousReplies) =>
      previousReplies.filter((reply) => reply.id !== id)
    );
  };

  const addReplyHandler = (text) => {
    let newReply = {
      id: Math.random(),
      content: text,
      user: {
        image: { png: currentUserData.image.png },
        username: currentUserData.username,
      },
      createdAt: "2 hours ago",
      score: 0,
    };
    setReplies((previousReplies) => {
      return [...previousReplies, newReply];
    });
    setIsReplying(false);
  };

  const submitEditHandler = (e) => {
    e.preventDefault();
    setText(e.target.text.value);
    setIsEdit(false);
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
        <button className={classes.actionBtn} onClick={() => setIsEdit(true)}>
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
            <p className={classes.text}>{text}</p>
          ) : (
            <form id="editForm" onSubmit={submitEditHandler}>
              <input placeholder="Text" name="text" defaultValue={text} />
            </form>
          )}
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
          onAddReply={addReplyHandler}
          type="reply"
          username={props.username}
        />
      )}
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
                onDeleteReply={deleteReplyHandler}
                onAddReply={addReplyHandler}
              />
            );
          })}
      </ul>
    </Fragment>
  );
};

export default Comment;
