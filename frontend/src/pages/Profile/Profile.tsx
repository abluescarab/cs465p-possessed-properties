import "./Profile.scss";
import { useContext, useEffect, useState } from "react";
import { setTitle } from "@/utils.tsx";
import { UserContext } from "@/App.tsx";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [dbUser, setDbUser] = useState(null);
  const [doFetch, setDoFetch] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await axios({
        method: "SEARCH",
        url: "http://localhost:8080/users",
        data: { email: user.email },
      }).then((request) => {
        setDbUser(request.data);
        setTitle(`${request.data.name}'s Profile`);
        setDoFetch(false);
      });
    };

    if (user && doFetch) {
      fetchUser();
    }
  }, [doFetch, user]);

  return (
    <article id={"profile-page"} className={"page"}>
      {dbUser ? (
        <>
          <h2 className={"profile-name"}>{dbUser && dbUser.name}</h2>
          <div id={"profile-col-1"} className={"profile-col"}>
            <h3>Offers</h3>
            {/* TODO: load created offers */}
          </div>
          <div id={"profile-col-2"} className={"profile-col"}>
            <h3>Listings</h3>
            {/* TODO: load created listings */}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </article>
  );
};

export default Profile;
