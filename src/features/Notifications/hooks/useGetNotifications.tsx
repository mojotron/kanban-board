import { useCollectDocsSnapshot } from '../../../hooks/useCollectDocsSnapshot';
import { NotificationTypeWithId } from '../types/typesNotifications';

export const useGetNotifications = (notificationList: string[] | undefined) => {
  const {
    documents: notifications,
    error,
    pending,
  } = useCollectDocsSnapshot<NotificationTypeWithId>(
    notificationList,
    'notifications'
  );

  return { notifications, error, pending };
};
