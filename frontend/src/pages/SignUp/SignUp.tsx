import "./SignUp.scss";
import { useEffect, useRef } from "react";
import { setTitle } from "@/utils.tsx";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@/firebase.ts";
import { HttpStatus } from "@/status_codes.ts";

const SignUp = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const userConfirmPassword = useRef<HTMLInputElement>(null);
  const invalidNotice = useRef(null);

  useEffect(() => {
    setTitle("Sign Up");
  }, []);

  const signUp = async (e) => {
    e.preventDefault();

    const email = userEmail.current;
    const password = userPassword.current;
    const confirm = userConfirmPassword.current;

    if (email.validity.typeMismatch) {
      email.setCustomValidity("Must be a valid email");
      email.reportValidity();
      return;
    } else {
      email.setCustomValidity("");
    }

    if (password.validity.tooShort) {
      password.setCustomValidity("Password must be at least 6 characters");
      password.reportValidity();
      return;
    } else {
      password.setCustomValidity("");
    }

    if (confirm.value !== password.value) {
      confirm.setCustomValidity("Passwords must match");
      confirm.reportValidity();
      return;
    } else {
      confirm.setCustomValidity("");
    }

    await axios({
      method: "POST",
      url: "http://localhost:8080/users",
      data: {
        email: email.value,
        name: userName.current.value,
        password: password.value,
      },
    })
      .then((response) => {
        if (response.status == HttpStatus.OK) {
          invalidNotice.current.innerText = "";

          signInWithEmailAndPassword(auth, email.value, password.value).then(
            () => {
              navigate(-1);
            }
          );
        }
      })
      .catch((err) => {
        if (err.response.status == HttpStatus.CONFLICT) {
          invalidNotice.current.innerText =
            "An account with that email already exists.";
        } else {
          invalidNotice.current.innerText =
            "Account creation failed. Please try again.";
        }
      });
  };

  return (
    <div id={"sign-up-page"}>
      <div className={"invalid-notice"} ref={invalidNotice}></div>
      <Card className={"card-form"}>
        <CardTitle>Sign up</CardTitle>
        <CardContent>
          <form>
            <div className={"form-line"}>
              <TextInput
                id={"name"}
                label={"Name"}
                name={"name"}
                placeholder={"e.g. Your Name"}
                required
                ref={userName}
                autoComplete={"off"}
              />
            </div>
            <div className={"form-line"}>
              <TextInput
                id={"email"}
                label={"Email"}
                name={"email"}
                placeholder={"e.g. yourname@email.com"}
                type={"email"}
                required
                ref={userEmail}
                autoComplete={"off"}
              />
            </div>
            <div className={"form-line"}>
              <TextInput
                id={"password"}
                label={"Password"}
                name={"password"}
                type={"password"}
                placeholder={"e.g. hunter2"}
                required
                ref={userPassword}
                minLength={6}
              />
            </div>
            <div className={"form-line"}>
              <TextInput
                id={"confirm-password"}
                label={"Confirm password"}
                name={"confirm-password"}
                type={"password"}
                placeholder={"Passwords must match"}
                required
                ref={userConfirmPassword}
                minLength={6}
              />
            </div>
            <div className={"form-line"}>
              <Button
                type={"submit"}
                color={"primary"}
                className={"form-button"}
                onClick={signUp}
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <section className={"auth-links"}>
        <p className={"center-text font-sm auth-links-paragraph"}>
          Already have an account?&nbsp;<Link to={"/signin"}>Sign in</Link>
        </p>
      </section>
    </div>
  );
};

export default SignUp;
