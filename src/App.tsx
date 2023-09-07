// pages
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/LoginPage/Login';
// state
import { useAuth } from './context/AuthContext';
// router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import UserLayout from './layouts/UserLayout/UserLayout';
import KanbanBoard from './pages/KanbanBoardPage/KanbanBoard';
import Profile from './pages/Profile/Profile';
import FindProjects from './pages/FindProjects/FindProjects';

// helper components for page navigation

const App = () => {
  const { authIsReady } = useAuth();

  // TODO new routes
  // login
  // profile => current user or other user
  // project => admin, collaborator, other => reroute or 404
  // kanban board of a project
  // find project
  // find developer

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<UserLayout />}></Route>
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
