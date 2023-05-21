import "./SignOut.scss";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "@/firebase.ts";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

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
    <div id={"sign-out-page"}>
      {signedOut && (
        <>
          <p>You have been successfully signed out.</p>
          <Button onClick={() => navigate(-1)} color={"primary"}>
            Go back
          </Button>
        </>
      )}
    </div>
  );
};

export default SignOut;