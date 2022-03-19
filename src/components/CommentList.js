import Comment from "./Comment";

const CommentList = (props) => {
  const comments = props.data.comments;
  console.log(comments);
  return (
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
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
