// pages
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/LoginPage/Login';
// state
import { useAuth } from './context/AuthContext';
// router
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import UserLayout from './layouts/UserLayout/UserLayout';
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoard';
import Profile from './pages/Profile/Profile';

// helper components for page navigation

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user !== null ? <Outlet /> : <Navigate to="login" />;
};

const App = () => {
  const { authIsReady, user } = useAuth();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Dashboard />} />
                <Route path=":userName" element={<Profile />} />
              </Route>
              <Route path="/kanban/:projectId" element={<KanbanBoard />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
