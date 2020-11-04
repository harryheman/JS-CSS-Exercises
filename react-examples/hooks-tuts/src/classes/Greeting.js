import React, { Component } from "react";

export default class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: window.localStorage.getItem("classFN") || "Harry",
      lastName: window.localStorage.getItem("classLN") || "Heman",
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  handleFirstNameChange = (e) =>
    this.setState({
      firstName: e.target.value,
    });

  handleLastNameChange = (e) =>
    this.setState({
      lastName: e.target.value,
    });

  componentDidUpdate() {
    window.localStorage.setItem("classFN", this.state.firstName);

    window.localStorage.setItem("classLN", this.state.lastName);
  }

  render() {
    return (
      <div>
        <input
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
        />
        <input
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
        />
        <p>
          Hello, {this.state.firstName} {this.state.lastName}!
        </p>
      </div>
    );
  }
}
