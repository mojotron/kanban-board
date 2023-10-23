import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { NotificationType } from '../types/typesNotifications';
import { UserWithId } from '../../../types/userType';

export const useCreateNotification = (): {
  create: (userId: string, data: NotificationType) => void;
} => {
  const { addDocument, updateDocument, getDocument } = useFirestore();

  const create = useCallback(async (userId: string, data: NotificationType) => {
    // get user
    const userData = await getDocument<UserWithId>('users', userId);
    if (userData === undefined) return;
    // create notification
    const notificationData = await addDocument<NotificationType>(
      'notifications',
      data
    );
    if (notificationData === undefined) return;
    // add notification to specified user
    const modifiedNotifications = [
      ...userData.notifications,
      notificationData.id,
    ];
    await updateDocument('users', userId, {
      notifications: modifiedNotifications,
    });
  }, []);

  return { create };
};
