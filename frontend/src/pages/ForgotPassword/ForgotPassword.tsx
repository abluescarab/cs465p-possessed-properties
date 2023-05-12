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
  });

  return (
    <section>
      <Card className={"auth"}>
        <CardContent>
          <p className={"font-sm"}>
            Enter the email address associated with your account and we'll send
            you instructions to reset your password.
          </p>
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
              <Button type={"submit"} color={"primary"}>
                Submit
              </Button>
            </div>
            <div className={"input-line"}>
              <Link to={"/signin"} className={"font-sm"}>
                Back to sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPassword;
