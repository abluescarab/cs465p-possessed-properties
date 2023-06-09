import "./SignOut.scss";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "@/firebase.ts";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/AppRouter.tsx";

const SignOut = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    const doSignOut = async () => {
      await signOut(auth).then(() => setSignedOut(true));
    };

    doSignOut();
  }, [auth]);

  return (
    <div id={"sign-out-page"} className={"centered-page"}>
      {signedOut && (
        <>
          <h1>You have been successfully signed out.</h1>
          <Button onClick={() => navigate(Routes.home.path)} color={"primary"}>
            Go home
          </Button>
        </>
      )}
    </div>
  );
};

export default SignOut;
