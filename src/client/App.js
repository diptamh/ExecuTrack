import React, { Component } from "react";
import "./app.css";
import Home from "./components/home";

export default class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return <div>{ <Home /> }</div>;
  }
}
