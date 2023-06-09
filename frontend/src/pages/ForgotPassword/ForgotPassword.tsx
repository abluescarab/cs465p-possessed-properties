import "./ForgotPassword.scss";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { setTitle } from "@/utils.ts";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "@/firebase.ts";
import { Routes } from "@/AppRouter.tsx";

const ForgotPassword = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const userEmail = useRef<HTMLInputElement>(null);

  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    userEmail.current.checkValidity();

    if (!userEmail.current.reportValidity()) {
      return;
    }

    await sendPasswordResetEmail(auth, userEmail.current.value)
      .then(() => {
        setEmailSent(true);
      })
      .catch(() => {
        // can't prevent logging bad request to the console, but can pretend
        // that it worked
        setEmailSent(true);
      });
  };

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      await sendEmail(e);
    }
  };

  useEffect(() => {
    setTitle("Forgot Password");
  }, []);

  return (
    <div
      id={"forgot-password-page"}
      className={"centered-page"}
      onKeyDown={onKeyDown}
    >
      {emailSent ? (
        <>
          <h1>Check your inbox for your password reset email.</h1>
          <Button
            onClick={() => navigate(Routes.signIn.path)}
            color={"primary"}
          >
            Go to sign in
          </Button>
        </>
      ) : (
        <>
          <Card className={"card-form"}>
            <CardTitle>Forgot password</CardTitle>
            <CardContent>
              <p className={"font-sm form-paragraph"}>
                Enter the email address associated with your account and we'll
                send you instructions to reset your password.
              </p>
              <form>
                <div className={"form-line"}>
                  <TextInput
                    id={"email"}
                    label={"Email"}
                    name={"email"}
                    placeholder={"e.g. yourname@email.com"}
                    type={"email"}
                    required
                    ref={userEmail}
                  />
                </div>
                <div className={"form-line"}>
                  <Button
                    type={"submit"}
                    color={"primary"}
                    className={"form-button"}
                    onClick={sendEmail}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <section className={"auth-links"}>
            <p className={"auth-links-paragraph center-text font-sm"}>
              <Link to={"/signin"}>Back to sign in</Link>
            </p>
            <p className={"auth-links-paragraph center-text font-sm"}>
              No account?&nbsp;<Link to={"/signup"}>Sign up</Link>
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
