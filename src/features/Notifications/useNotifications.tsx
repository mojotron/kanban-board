import { useCallback, useMemo } from 'react';
import { useUserData } from '../../context/UserDataContext';
import { useCollectDocsSnapshot } from '../../hooks/useCollectDocsSnapshot';
import { NotificationTypeWithId } from './typesNotifications';

export const useNotifications = (): {
  notifications: NotificationTypeWithId[] | undefined;
  newNotificationCount: number;
  createNotification: () => void;
  deleteNotification: () => void;
} => {
  const { document: user } = useUserData();
  const { documents: notifications } =
    useCollectDocsSnapshot<NotificationTypeWithId>(
      user?.notifications,
      'notifications'
    );

  const newNotificationCount = useMemo(() => {
    if (!notifications) return 0;
    return notifications?.map((n) => n.isOpened === false).length;
  }, []);

  const createNotification = useCallback(() => {}, []);
  const deleteNotification = useCallback(() => {}, []);

  return {
    notifications,
    newNotificationCount,
    createNotification,
    deleteNotification,
  };
};
