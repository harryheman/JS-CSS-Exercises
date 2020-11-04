import React, { Component } from "react";

const ProfileContext = React.createContext();

class ProfileProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    company: "Company Name",
    companyImg: "company-image.png",
    url: "https://example.com",
    userImg: "user-image.png",
    userName: "User Name",
    fullName: "Full Name",
    team: "Team Name",
    changeTeam: (team) =>
      this.setState({
        team,
      }),
  };

  render() {
    return (
      <ProfileContext.Provider value={this.state}>
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}

const App = () => (
  <ProfileProvider>
    <Profile />
  </ProfileProvider>
);

const Profile = () => (
  <div className="profile">
    <ProfileContext.Consumer>
      {(context) => <img src={context.companyImg} />}
    </ProfileContext.Consumer>
    <User />
  </div>
);

const User = () => (
  <div className="user">
    <ProfileContext.Consumer>
      {(context) => (
        <>
          <a href={context.url}>
            <img src={context.userImg} />
          </a>
          <p className="user-name">{context.userName}</p>
          <p className="full-name">{context.fullName}</p>
          <Team />
          <button onClick={() => context.changeTeam("React")}>React</button>
          <button onClick={() => context.changeTeam("Vue")}>Vue</button>
          <button onClick={() => context.changeTeam("Angular")}>Angular</button>
        </>
      )}
    </ProfileContext.Consumer>
  </div>
);

const Team = () => (
  <ProfileContext.Consumer>
    {(context) => (
      <div className="team">
        <p>{context.team}</p>
      </div>
    )}
  </ProfileContext.Consumer>
);

export default App;
