import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

const ProfileProvider = (props) => {
  const userInfo = {
    company: "Company Name",
    companyImg: "company-image.png",
    url: "https://example.com",
    userImg: "user-image.png",
    userName: "User Name",
    fullName: "Full Name",
    team: "Team Name",
    toggleTeam: (prop, val) => {
      setUserData({ ...userData, [prop]: val });
    },
  };

  const [userData, setUserData] = useState(userInfo);

  return (
    <ProfileContext.Provider value={userData}>
      {props.children}
    </ProfileContext.Provider>
  );
};

const Profile = () => {
  const context = useContext(ProfileContext);
  return (
    <div className="profile">
      <img src={context.companyImg} />
      <User />
    </div>
  );
};

const User = () => {
  const context = useContext(ProfileContext);
  return (
    <div className="user">
      <a href={context.url}>
        <img src={context.userImg} />
      </a>
      <p className="user-name">{context.userName}</p>
      <p className="full-name">{context.fullName}</p>
      <Team />
      <ChangeTeam />
    </div>
  );
};

const Team = () => {
  const context = useContext(ProfileContext);
  return (
    <div className="team">
      <p>{context.team}</p>
    </div>
  );
};

const ChangeTeam = () => {
  const context = useContext(ProfileContext);
  return (
    <>
      <button onClick={() => context.toggleTeam("team", "React")}>React</button>
      <button onClick={() => context.toggleTeam("team", "Vue")}>Vue</button>
      <button onClick={() => context.toggleTeam("team", "Angular")}>
        Angular
      </button>
    </>
  );
};

const App = () => (
  <ProfileProvider>
    <Profile />
  </ProfileProvider>
);

export default App;
