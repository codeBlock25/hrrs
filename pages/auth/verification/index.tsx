import { Component } from "react";
import Router from "next/router";

export default class _error extends Component {
  componentDidMount = () => {
    Router.push("/auth/register");
  };

  render() {
    return <div>Invalid route</div>;
  }
}
