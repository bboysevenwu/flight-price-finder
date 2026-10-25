import { createBrowserRouter, type RouteObject } from "react-router";
import { App, ErrorComponent, NotFoundComponent } from "./App";
import { RequireAuth } from "./components/RequireAuth";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AppPage from "./pages/AppPage";

export const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/auth", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      {
        element: <RequireAuth />,
        children: [{ path: "/app", element: <AppPage /> }],
      },
      { path: "*", element: <NotFoundComponent /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
