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
import UserList from "./pages/user/UserList";
import RolePermissionList from "./pages/rolePermissions/RolePermissionList";
import EditRolePermission from "./pages/rolePermissions/EditRolePermission";
import UserDetails from "./pages/user/UserDetails";
import EditUserInfo from "./pages/user/EditUserInfo";
import Profile from "./pages/profile/Profile";
import GlobalAuthModal from "./components/GlobalAuthModal";

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
      <GlobalAuthModal />
      <Navbar />
      <div>
        <Outlet />
      </div>
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
  component: UserList,
});

const userDetailsRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/users/details/$id",
  component: UserDetails,
});

const editUserRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/users/edit/$id",
  component: EditUserInfo,
});

const rolePermissionRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/role-permissions",
  component: RolePermissionList,
});

const editRolePermissionRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "/role-permissions/edit/$id",
  component: EditRolePermission,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedLayout,
  path: "profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  publicLayout.addChildren([loginRoute]),
  protectedLayout.addChildren([
    dashboardRoute,
    userRoute,
    rolePermissionRoute,
    editRolePermissionRoute,
    userDetailsRoute,
    editUserRoute,
    profileRoute
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
