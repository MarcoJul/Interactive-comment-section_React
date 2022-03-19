import classes from "./Comment.module.css";

import replyIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import minusIcon from "../assets/icon-minus.svg";
import plusIcon from "../assets/icon-plus.svg";
import EditIcon from "../assets/icon-edit.svg";

const Reply = (props) => {
  return (
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
        <button className={classes.replyBtn}>
          <img src={replyIcon} alt="replyicon" />
          Reply
        </button>
      </div>
    </li>
  );
};

export default Reply;
