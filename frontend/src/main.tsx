import React from "react";
import ReactDOM from "react-dom/client";
import "@css/index.scss";
import { RouterProvider } from "react-router-dom";
import AppRouter from "@/AppRouter.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
);
