import "./SignIn.scss";
import Card from "@/components/Card/Card.tsx";
import CardContent from "@/components/Card/CardContent.tsx";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Button from "@/components/Button/Button.tsx";

const SignIn = () => {
  return (
    <>
      <section>
        <Card className={"sign-in"}>
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
    </>
  );
};

export default SignIn;
