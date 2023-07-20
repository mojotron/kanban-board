// pages
import Dashboard from './pages/DashboardPage/Dashboard';
import Login from './pages/LoginPage/Login';
// state
import { useAuth } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
// components
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoard';
// router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { ProjectProvider } from './context/ProjectContext';

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
                <ProtectedRoute condition={user !== null} linkTo="login">
                  <UserDataProvider>
                    <ProjectProvider>
                      <Dashboard />
                    </ProjectProvider>
                  </UserDataProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute condition={user === null} linkTo="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/kanban/:projectId" element={<KanbanBoard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
