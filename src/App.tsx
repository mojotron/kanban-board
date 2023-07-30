// pages
import Dashboard from './pages/DashboardPage/Dashboard';
import Login from './pages/LoginPage/Login';
// state
import { useAuth } from './context/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
// components
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoard';
// router
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import UserLayout from './components/UserLayout/UserLayout';

// helper components for page navigation

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user !== null ? <Outlet /> : <Navigate to="login" />;
};

const App = () => {
  const { authIsReady, user } = useAuth();

  console.log('here', authIsReady, user);
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/"
                element={
                  <UserDataProvider>
                    <UserLayout />
                  </UserDataProvider>
                }
              >
                <Route index element={<p>works?</p>} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
