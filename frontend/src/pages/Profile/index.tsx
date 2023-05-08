import React from "react";

import "./index.scss";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  return (
    <div className={"profile-div"}>
      Profile...
      <br />
      <Link to={"/search"}>to search</Link>
    </div>
  );
};

export default Profile;
