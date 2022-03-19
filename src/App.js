import { Fragment } from "react";
import classes from "./App.module.css";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

import data from "./data/data.json";

console.log(data);

const App = () => {
  return (
    <Fragment>
      <CommentList data={data} />
    </Fragment>
  );
};

export default App;
