import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import {
  NotificationType,
  NotificationOptionType,
  NotificationProjectType,
  NotificationUserType,
} from '../types/typesNotifications';
import { UserWithId } from '../../../types/userType';
import { Timestamp } from 'firebase/firestore';

export const useNotification = (): {
  createNotification: (
    userId: string,
    type: NotificationOptionType,
    projectData: NotificationProjectType,
    userData: NotificationUserType
  ) => void;
  deleteNotification: (notificationId: string, userId: string) => void;
  markOpenNotification: (notificationId: string) => void;
} => {
  const { addDocument, updateDocument, getDocument, deleteDocument } =
    useFirestore();

  const createNotification = useCallback(
    async (
      userId: string,
      type: NotificationOptionType,
      projectData: NotificationProjectType,
      userData: NotificationUserType
    ) => {
      // get user
      const userDoc = await getDocument<UserWithId>('users', userId);
      if (userDoc === undefined) return;
      // create notification
      const newNotification: NotificationType = {
        type: type,
        user: userData,
        project: projectData,
        isOpened: false,
        createdAt: Timestamp.fromDate(new Date()),
      };
      const notificationData = await addDocument<NotificationType>(
        'notifications',
        newNotification
      );
      if (notificationData === undefined) return;
      // add notification to specified user
      const modifiedNotifications = [
        ...userDoc.notifications,
        notificationData.id,
      ];
      await updateDocument('users', userId, {
        notifications: modifiedNotifications,
      });
    },
    [addDocument, updateDocument, getDocument]
  );

  const deleteNotification = useCallback(
    async (notificationId: string, userId: string) => {
      // update user
      const userDoc = await getDocument<UserWithId>('users', userId);
      if (!userDoc) return;
      const notifications = userDoc.notifications.filter(
        (notification) => notification !== notificationId
      );
      await updateDocument('users', userId, { notifications });
      // delete doc
      await deleteDocument('notifications', notificationId);
    },
    [getDocument, updateDocument, deleteDocument]
  );

  const markOpenNotification = useCallback(async (notificationId: string) => {},
  []);

  return { createNotification, deleteNotification, markOpenNotification };
};
