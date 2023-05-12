import "./SignUp.scss";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const SignUp = () => {
  useEffect(() => {
    setTitle("Sign Up");
  });

  return <div></div>;
};

export default SignUp;
