import classes from "./CurrentUser.module.css";

import data from "../../data/data.json";

const CurrentUser = (props) => {
  const currentUserData = data.currentUser;

  if (props.request === "avatar") {
    return (
      <img
        className={classes.avatarImg}
        src={currentUserData.image.png}
        alt={`avatar of ${currentUserData.username}`}
      />
    );
  } else {
    return <div></div>;
  }
};

export default CurrentUser;
