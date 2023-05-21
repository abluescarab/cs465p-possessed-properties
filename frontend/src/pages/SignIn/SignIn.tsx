import "./SignIn.scss";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { setTitle } from "@/utils.tsx";
import firebaseApp from "@/firebase.ts";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle("Sign In");
  }, []);

  const signIn = async (e) => {
    e.preventDefault();

    const email = userEmail.current.value;
    const password = userPassword.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        // TODO: display error if sign in invalid
        console.log(err);
      });
  };

  return (
    <div id={"sign-in-page"}>
      <Card className={"card-form"}>
        <CardTitle>Sign in</CardTitle>
        <CardContent>
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
              <TextInput
                id={"password"}
                label={"Password"}
                name={"password"}
                placeholder={"e.g. hunter2"}
                required
                ref={userPassword}
              />
            </div>
            <div className={"form-line"}>
              <Button
                color={"primary"}
                type={"submit"}
                className={"form-button"}
                onClick={signIn}
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <section className={"auth-links"}>
        <p className={"auth-links-paragraph center-text font-sm"}>
          No account?&nbsp;<Link to={"/signup"}>Sign up</Link>
        </p>
        <p className={"auth-links-paragraph center-text font-sm"}>
          <Link to={"/forgotpassword"}>Forgot your password?</Link>
        </p>
      </section>
    </div>
  );
};

export default SignIn;
