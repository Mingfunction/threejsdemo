import React, { Component } from "react";
import Galaxy from "../utils/galaxy";

export class Test11 extends Component {
  state = {
    gui: null,
  };
  componentDidMount() {
    let container = document.getElementById("container");
    new Galaxy(container);
  }
  componentWillUnmount() {}
  render() {
    return <div id="container"></div>;
  }
}

export default Test11;
