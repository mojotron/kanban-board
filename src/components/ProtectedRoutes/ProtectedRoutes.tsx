import { useAuth } from '../../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import { UserDataProvider } from '../../context/UserDataContext';
import { ProjectProvider } from '../../context/ProjectContext';

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user !== null ? (
    <UserDataProvider>
      <ProjectProvider>
        <Outlet />
      </ProjectProvider>
    </UserDataProvider>
  ) : (
    <Navigate to="login" />
  );
};
export default ProtectedRoutes;
