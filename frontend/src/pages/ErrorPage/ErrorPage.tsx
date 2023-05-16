import { useNavigate, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";
import Button from "@/components/Button/Button.tsx";
import { useEffect } from "react";
import { setTitle } from "@/utils.tsx";

const ErrorPage = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Error");
  }, []);

  return (
    <div id={"error-page"}>
      <h1>Error</h1>
      <p>An unexpected error has occurred.</p>
      <p className={"emphasis"}>
        {error.status}: {error.statusText || error.message}
      </p>
      <p>
        <Button onClick={() => navigate(-1)} color={"primary"}>
          Go back
        </Button>
      </p>
    </div>
  );
};

export default ErrorPage;
