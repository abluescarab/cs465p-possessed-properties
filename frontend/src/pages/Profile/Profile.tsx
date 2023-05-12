import "./Profile.scss";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className={"profile-div"}>
      Profile...
      <br />
      <Link to={"/search"}>to search</Link>
    </div>
  );
};

export default Profile;
