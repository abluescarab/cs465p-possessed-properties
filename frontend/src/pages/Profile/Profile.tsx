import "./Profile.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const Profile = () => {
  useEffect(() => {
    setTitle("Profile");
  }, []);

  return (
    <div className={"profile-div"}>
      Profile...
      <br />
      <Link to={"/search"}>to search</Link>
    </div>
  );
};

export default Profile;
