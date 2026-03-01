import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const publicLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "_public",
  beforeLoad: () => {
    if (localStorage.getItem("access_token")) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => <Outlet />,
});

const protectedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "_protected",
  beforeLoad: () => {
    if (!localStorage.getItem("access_token")) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => (
    <div className="min-h-screen">
      <Navbar />
      <div><Outlet /></div>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/login",
    });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => publicLayout,
  path: "/login",
  component: Login,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/dashboard",
  component: Dashboard,
});

const userRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/users",
  component: () => <>User List ....</>,
});

const rolePermissionRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/role-permissions",
  component: () => <>User List ....</>,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  publicLayout.addChildren([loginRoute]),
  protectedLayout.addChildren([dashboardRoute, userRoute, rolePermissionRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
