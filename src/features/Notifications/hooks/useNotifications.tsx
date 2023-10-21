import { useCallback, useMemo } from 'react';
import { useUserData } from '../../../context/UserDataContext';
import { useCollectDocsSnapshot } from '../../../hooks/useCollectDocsSnapshot';
import {
  NotificationType,
  NotificationTypeWithId,
} from '../types/typesNotifications';
import { useFirestore } from '../../../hooks/useFirestore';
import { Timestamp } from 'firebase/firestore';

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
  const { addDocument } = useFirestore();

  const newNotificationCount = useMemo(() => {
    if (!notifications) return 0;
    return notifications?.map((n) => n.isOpened === false).length;
  }, []);

  const createNotification = useCallback(async () => {
    await addDocument<NotificationType>('notifications', {
      createdAt: Timestamp.fromDate(new Date()),
      isOpened: false,
      text: 'this is temp text',
      typeOfDoc: 'project',
      docId: 'sOhrd3oScWpTZSKr6ES3',
    });
  }, []);
  const deleteNotification = useCallback(() => {}, []);

  return {
    notifications,
    newNotificationCount,
    createNotification,
    deleteNotification,
  };
};
