import { Link, useRouteError } from "react-router-dom";
import { StatusMessage } from "../components/status-message";
interface ErrorResponse {
  statusText?: string;
  status?: number;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-xl text-gray-300">
        Sorry, an unexpected error has occured.
      </h1>
      <StatusMessage
        message={`${error?.status ?? ""} ${error?.statusText ?? error?.message ?? ""}`}
        variant="error"
      />
      <Link to="/" className="text-lg">
        Go back to the home page
      </Link>
    </main>
  );
}
