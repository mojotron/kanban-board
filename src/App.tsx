// pages
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/LoginPage/Login';
// state
import { useAuth } from './context/AuthContext';
// router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import UserLayout from './layouts/UserLayout/UserLayout';
import KanbanBoard from './pages/KanbanBoardPage/Kanban';
import Profile from './pages/Profile/Profile';
import FindProjects from './pages/FindProjects/FindProjects';
import { useUserData } from './context/UserDataContext';

// helper components for page navigation

const App = () => {
  const { authIsReady, user } = useAuth();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<UserLayout />}>
                <Route
                  index
                  element={<Navigate to={`/${user?.uid}`} replace />}
                />
                <Route path="/:userId" element={<Profile />} />
                <Route path="/project/:projectId" element={<Dashboard />} />
                <Route path="/kanban/:projectId" element={<KanbanBoard />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        // <BrowserRouter>
        //   <Routes>
        //     <Route element={<ProtectedRoutes />}>
        //       <Route path="/" element={<UserLayout />}>
        //         <Route index element={<Dashboard />} />
        //         <Route path=":userName" element={<Profile />} />
        //       </Route>
        //       <Route path="/kanban/:projectId" element={<KanbanBoard />} />
        //       <Route path="/find-project" element={<FindProjects />} />
        //     </Route>
        //     <Route path="/login" element={<Login />} />
        //   </Routes>
        // </BrowserRouter>
      )}
    </div>
  );
};

export default App;
