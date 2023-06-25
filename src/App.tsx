import {
  RootRoute,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Navigate,
} from '@tanstack/router';
// pages
import Dashboard from './pages/Dashboard/Dashboard';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Login from './pages/Login/Login';

const AUTH = true; //
// helper components for page navigation
const AuthRouting = () => {
  if (AUTH) return <Dashboard />;
  else return <Login />;
};

const NotFoundRouting = () => {
  return <Navigate to="/" />;
};
// root route
const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
// routes
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AuthRouting,
});
const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/*',
  component: NotFoundRouting,
});
// const projectRoute = new Route({});

const routeTree = rootRoute.addChildren([indexRoute, notFoundRoute]);

const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
