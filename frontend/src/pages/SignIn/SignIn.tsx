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
  });

  return (
    <>
      <section>
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
                <Button color={"primary"} type={"submit"}>
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <section className={"account-links"}>
        <p className={"center-text font-sm"}>
          No account?&nbsp;<Link to={"/signup"}>Sign up</Link>
        </p>
        <p>
          <Link className={"center-text font-sm"} to={"/forgotpassword"}>
            Forgot your password?
          </Link>
        </p>
      </section>
    </>
  );
};

export default SignIn;
