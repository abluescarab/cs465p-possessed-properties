import "./SignUp.scss";
import { useEffect, useRef } from "react";
import { setTitle } from "@/utils.tsx";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle("Sign Up");
  }, []);

  const signUp = async (e) => {
    e.preventDefault();

    // axios({
    //   method: "POST",
    //   url: "http://localhost:8080/users",
    //   data:
    // });

    // e.preventDefault();
    // const auth = getAuth(firebaseApp);
    //
    // await createUserWithEmailAndPassword(
    //   auth,
    //   userEmail.current.value,
    //   userPassword.current.value
    // )
    //   .then((cred) => {
    //     const user = cred.user;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div id={"signup-page"}>
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
