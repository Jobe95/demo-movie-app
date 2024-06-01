import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootPage from "./routes/root-page";
import MovieDetailPage, {
  loader as movieDetailLoader,
} from "./routes/movie-detail-page";
import ErrorPage from "./routes/error-page";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "movie/:movieId",
    element: <MovieDetailPage />,
    errorElement: <ErrorPage />,
    loader: movieDetailLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
