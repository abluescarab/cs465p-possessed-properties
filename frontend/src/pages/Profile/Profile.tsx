import "./Profile.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const Profile = () => {
  useEffect(() => {
    setTitle("Profile");
  }, []);

  return (
    <>
      <section className={"profile-page"}>
        Profile...
        <br />
        <Link to={"/search"}>to search</Link>
      </section>
    </>
  );
};

export default Profile;
