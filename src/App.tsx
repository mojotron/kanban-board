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
import Login from './pages/LoginPage/Login';
// state
import { AuthContextProvider, useAuth } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoard';

// helper components for page navigation
const AuthRouting = () => {
  const { authIsReady } = useAuth();
  console.log('there', authIsReady);
  if (authIsReady)
    return (
      <UserDataProvider>
        <Dashboard />
      </UserDataProvider>
    );
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
const user = new Route({
  getParentRoute: () => rootRoute,
  path: '/$user',
  component: Dashboard,
});
const projectKanbanBoard = new Route({
  getParentRoute: () => rootRoute,
  path: '/project/$projectId',
  component: KanbanBoard,
});
const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/*',
  component: NotFoundRouting,
});
// const projectRoute = new Route({});

const routeTree = rootRoute.addChildren([
  indexRoute,
  projectKanbanBoard,
  notFoundRoute,
]);

const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { authIsReady } = useAuth();
  console.log('here', authIsReady);
  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
};

export default App;
