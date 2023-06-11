import "./SignIn.scss";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { navigateLast, setTitle } from "@/utils.ts";
import firebaseApp from "@/firebase.ts";
import {
  getAuth,
  signInWithEmailAndPassword,
  AuthErrorCodes,
} from "firebase/auth";
import { Routes } from "@/AppRouter.tsx";

const SignIn = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const location: Location = useLocation();

  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const notice = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitle("Sign In");
  }, []);

  const signIn = async (e) => {
    e.preventDefault();

    userEmail.current.checkValidity();
    userPassword.current.checkValidity();

    if (
      !userEmail.current.reportValidity() ||
      !userPassword.current.reportValidity()
    ) {
      return;
    }

    const email = userEmail.current.value;
    const password = userPassword.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        notice.current.innerText = "";

        if (location.state) {
          navigateLast(navigate, location);
        } else {
          navigate(Routes.home.path);
        }
      })
      .catch((err) => {
        if (err.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
          notice.current.innerText =
            "Too many login attempts. Try again later.";
        } else if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
          notice.current.innerText =
            "Account not found with that email and password.";
        } else {
          notice.current.innerText = "Sign in failed. Please try again.";
        }
      });
  };

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      await signIn(e);
    }
  };

  return (
    <div id={"sign-in-page"} onKeyDown={onKeyDown}>
      <div className={"notice invalid"} ref={notice}></div>
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
                type={"password"}
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
