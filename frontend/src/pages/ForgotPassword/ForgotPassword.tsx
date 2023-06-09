import "./ForgotPassword.scss";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { setTitle } from "@/utils.ts";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "@/firebase.ts";

const ForgotPassword = () => {
  const auth = getAuth(firebaseApp);

  const userEmail = useRef<HTMLInputElement>(null);
  const notice = useRef<HTMLDivElement>(null);

  const sendEmail = async (e) => {
    e.preventDefault();

    userEmail.current.checkValidity();

    if (!userEmail.current.reportValidity()) {
      return;
    }

    await sendPasswordResetEmail(auth, userEmail.current.value)
      .then(() => {
        notice.current.classList.remove("invalid");
        notice.current.innerText =
          "Check your inbox for your password reset email.";
      })
      .catch(() => {
        notice.current.classList.add("invalid");
        notice.current.innerText = "No account with that email exists.";
      });
  };

  useEffect(() => {
    setTitle("Forgot Password");
  }, []);

  return (
    <div
      id={"forgot-password-page"}
      className={"centered-page"}
    >
      <div className={"notice"} ref={notice}></div>
      <Card className={"card-form"}>
        <CardTitle>Forgot password</CardTitle>
        <CardContent>
          <p className={"font-sm form-paragraph"}>
            Enter the email address associated with your account and we'll send
            you instructions to reset your password.
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
      </section>
    </div>
  );
};

export default ForgotPassword;
