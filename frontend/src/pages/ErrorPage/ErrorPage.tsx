import { useNavigate, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";

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
        <button onClick={() => navigate(-1)}>Go back</button>
      </p>
    </div>
  );
};

export default ErrorPage;
