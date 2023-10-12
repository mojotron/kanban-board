import { useAuth } from '../../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import { UserDataProvider } from '../../context/UserDataContext';

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user !== null ? (
    <UserDataProvider>
      <Outlet />
    </UserDataProvider>
  ) : (
    <Navigate to="login" />
  );
};
export default ProtectedRoutes;
