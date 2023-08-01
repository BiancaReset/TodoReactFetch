//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle

//import your own components
import TodoList from "./component/TodoList";

//render your react application
ReactDOM.render(<TodoList />, document.getElementById("app"));
