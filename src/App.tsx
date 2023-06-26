import {
  RootRoute,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Navigate,
} from '@tanstack/router';
// pages
import Dashboard from './pages/DashboardPage/Dashboard';
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoard';
import Login from './pages/LoginPage/Login';
// state
import { useKanbanState } from './store';

// helper components for page navigation
const AuthRouting = () => {
  const authIsReady = useKanbanState((state) => state.authIsReady);

  if (authIsReady) return <Dashboard />;
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
