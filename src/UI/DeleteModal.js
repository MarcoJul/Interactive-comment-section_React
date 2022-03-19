import { Fragment } from "react";
import { createPortal } from "react-dom";

import classes from "./DeleteModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.overlay} onClick={props.onAction}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <h2 className={classes.title}>Delete comment</h2>
      <p className={classes.text}>
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className={classes.action}>
        <button className={`${classes.btn} ${classes.cancel}`}>
          No, Cancel
        </button>
        <button
          className={`${classes.btn} ${classes.confirm}`}
          onClick={props.onDelete}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

const DeleteModal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onAction={props.onAction} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <ModalOverlay onAction={props.onAction} onDelete={props.onDelete} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default DeleteModal;
