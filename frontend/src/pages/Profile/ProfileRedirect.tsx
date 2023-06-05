import { useContext, useEffect } from "react";
import { UserContext } from "@/App.tsx";
import { httpClient } from "@/http_client.ts";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/AppRouter.tsx";

const ProfileRedirect = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await httpClient
        .request({
          method: "search",
          url: "/users",
          data: { email: user.email },
        })
        .then((response) => {
          navigate(Routes.profile.replace(response.data.id));
        });
    };

    if (user) {
      getUser();
    }
  }, [user, navigate]);

  return <></>;
};

export default ProfileRedirect;
