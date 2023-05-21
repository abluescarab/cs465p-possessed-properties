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

const SignUp = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle("Sign Up");
  }, []);

  const signUp = async (e) => {
    e.preventDefault();

    const email = userEmail.current.value;
    const name = userName.current.value;
    const password = userPassword.current.value;

    await axios({
      method: "POST",
      url: "http://localhost:8080/users",
      data: {
        email,
        name,
        password,
      },
    }).then((response) => {
      console.log(response);
      if (response.status == 200) {
        signInWithEmailAndPassword(auth, email, password).then(() => {
          navigate(-1);
        });
      }
    });
  };

  return (
    <div id={"sign-up-page"}>
      <Card className={"card-form"}>
        <CardTitle>Sign up</CardTitle>
        <CardContent>
          <form>
            <div className={"form-line"}>
              <TextInput
                id={"name"}
                label={"name"}
                name={"name"}
                placeholder={"e.g. Your Name"}
                required
                ref={userName}
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
              />
            </div>
            {/* TODO: verify passwords are the same */}
            <div className={"form-line"}>
              <TextInput
                id={"confirm-password"}
                label={"Confirm password"}
                name={"confirm-password"}
                type={"password"}
                placeholder={"Passwords must match"}
                required
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
