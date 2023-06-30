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
import { useStore } from './store';
// temp
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseAuth } from './firebase/config';
import { useOnSnapshotDocument } from './hooks/useOnSnapshotDocument';

const useAuth = () => {
  const setAuth = useStore((state) => state.setAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      const uid = user?.uid;
      setAuth(uid, true);
    });

    return () => {
      setAuth(null, false);
      unsubscribe();
    };
  }, [setAuth]);
};
// temp

// helper components for page navigation
const AuthRouting = () => {
  const authIsReady = useStore((state) => state.authIsReady);

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
  useAuth();

  const user = useStore((state) => state.user);
  const userId = useStore((state) => state.userId);

  useOnSnapshotDocument('users', userId);

  console.log('auth', userId);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
