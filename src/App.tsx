// pages
import Dashboard from './pages/DashboardPage/Dashboard';
import Login from './pages/LoginPage/Login';
// state
import { AuthContextProvider, useAuth } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
// components
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoard';
// router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

// helper components for page navigation
type ProtectedProps = {
  condition: boolean;
  linkTo: string;
  children: ReactNode;
};
const ProtectedRoute = ({ condition, linkTo, children }: ProtectedProps) => {
  if (condition) {
    return children;
  } else {
    return <Navigate to={linkTo} />;
  }
};

// const Root = () => {
//   return (
//     <>
//       <h1>Hello</h1>
//       <Outlet />
//     </>
//   );
// };

// const router = createBrowserRouter([{ path: '/', element: <Root /> }]);

const App = () => {
  const { authIsReady, user } = useAuth();

  console.log('here', authIsReady, user);
  return (
    <div className="App">
      {true && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute condition={!!user} linkTo="login">
                  <UserDataProvider>
                    <Dashboard />
                  </UserDataProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute condition={!user} linkTo="/">
                  <Login />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
