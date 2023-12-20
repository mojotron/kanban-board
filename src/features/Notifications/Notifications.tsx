// hooks
import { useGetNotifications } from './hooks/useGetNotifications';
import { useUserData } from '../../context/UserDataContext';
// components
import NotificationContainer from './components/NotificationContainer/NotificationContainer';

const Notifications = () => {
  const { document: user } = useUserData();
  const { notifications } = useGetNotifications(user?.notifications);

  if (!notifications) return null;

  return <NotificationContainer notifications={notifications} />;
};

export default Notifications;
