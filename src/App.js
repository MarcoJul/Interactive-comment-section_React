import { Fragment } from "react";
import classes from "./App.module.css";
import CommentList from "./components/CommentList";

import data from "./data/data.json";

const App = () => {
  return (
    <Fragment>
      <CommentList data={data} />
    </Fragment>
  );
};

export default App;
