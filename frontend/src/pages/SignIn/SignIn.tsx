import "./SignIn.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const SignIn = () => {
  useEffect(() => {
    setTitle("Sign In");
  }, []);

  return (
    <div id={"signin-page"}>
      <Card className={"card-form"}>
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
              />
            </div>
            <div className={"form-line"}>
              <TextInput
                id={"password"}
                label={"Password"}
                name={"password"}
                placeholder={"e.g. hunter2"}
                required
              />
            </div>
            <div className={"form-line"}>
              <Button
                color={"primary"}
                type={"submit"}
                className={"form-button"}
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
