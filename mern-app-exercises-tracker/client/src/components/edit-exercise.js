import React, { Component } from "react";
import axios from "axios";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      users: [],
    };
  }

  async componentDidMount() {
    console.log(this.props)
      try {
          const response = await axios.get(`http://localhost:1234/exercises/${this.props.match.params.id}`)
          this.setState({
            username: response.data.username,
            description: response.data.description,
            duration: response.data.duration,
          });
      } catch (error) {
          console.log(error)
      }

      try {
          const response = await axios.get("http://localhost:1234/users")
          if (response.data.length) {
            this.setState({
                users: response.data.map((u) => u.username),
              });
          }
      } catch (error) {
          console.error(error)
      }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log()

    try {
        const response = await axios.put(
          `http://localhost:1234/update/${this.props.match.params.id}`,
          exercise
        )
        console.log(response.data)
        const timer = setTimeout(() => {
            clearTimeout(timer);
            window.location = "/exercises";
          }, 1500);
    } catch (error) {
        console.log(error)
    }
  }

  render() {
    return (
      <div>
        <h3 className="mt-2">Edit Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
