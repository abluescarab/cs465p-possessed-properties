import { useNavigate, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";
import Button from "@/components/Button/Button.tsx";

const ErrorPage = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div id={"error-page"}>
      <h1>Error</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <em>
          {error.status}: {error.statusText || error.message}
        </em>
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
