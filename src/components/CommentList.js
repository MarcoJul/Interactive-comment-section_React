import { useState, Fragment } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

import data from "../data/data.json";
const CommentList = (props) => {
  const [comments, setComments] = useState(props.data.comments);

  const currentUserData = data.currentUser;

  const addCommentHandler = (text) => {
    let newComment = {
      id: Math.random(),
      content: text.current.value,
      user: {
        image: { png: currentUserData.image.png },
        username: currentUserData.username,
      },
      createdAt: "1 hour ago",
      score: 0,
      replies: [],
    };
    setComments((previousComments) => {
      return [newComment, ...previousComments];
    });
    console.log("newComment", newComment);
  };

  const deleteHandler = (id) => {
    setComments((previousComments) =>
      previousComments.filter((comment) => comment.id !== id)
    );
  };

  return (
    <Fragment>
      <ul>
        {comments.map((comment) => {
          return (
            <Comment
              img={comment.user.image.png}
              username={comment.user.username}
              time={comment.createdAt}
              text={comment.content}
              id={comment.id}
              key={comment.id}
              score={comment.score}
              replies={comment.replies}
              onDelete={deleteHandler}
            />
          );
        })}
      </ul>
      <CommentForm onAddComment={addCommentHandler} type="comment" />
    </Fragment>
  );
};

export default CommentList;
