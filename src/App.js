import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import Mycomponets from "./components/MyComponent";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Mycomponets></Mycomponets>
        </div>
      </div>
    );
  }
}

export default App;
