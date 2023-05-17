import "./SignUp.scss";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link } from "react-router-dom";

const SignUp = () => {
  useEffect(() => {
    setTitle("Sign Up");
  }, []);

  return (
    <div id={"signup-page"}>
      <Card className={"auth"}>
        <CardContent>
          <form>
            <div className={"input-line"}>
              <TextInput
                id={"email"}
                label={"Email"}
                name={"email"}
                placeholder={"e.g. yourname@email.com"}
                type={"email"}
                className={"underline"}
              />
            </div>
            <div className={"input-line"}>
              <TextInput
                id={"password"}
                label={"Password"}
                name={"password"}
                placeholder={"e.g. hunter2"}
                className={"underline"}
              />
            </div>
            <div className={"input-line"}>
              <TextInput
                id={"confirm-password"}
                label={"Confirm password"}
                name={"confirm-password"}
                placeholder={"Passwords must match"}
                className={"underline"}
              />
            </div>
            <div className={"input-line"}>
              <Button
                type={"submit"}
                color={"primary"}
                className={"input-button"}
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
