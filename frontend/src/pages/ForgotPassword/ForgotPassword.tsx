import "./ForgotPassword.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const ForgotPassword = () => {
  useEffect(() => {
    setTitle("Forgot Password");
  }, []);

  return (
    <div id={"forgot-password-page"}>
      <Card className={"card-form"}>
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
              />
            </div>
            <div className={"form-line"}>
              <Button
                type={"submit"}
                color={"primary"}
                className={"form-button"}
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
