import { useCallback } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import {
  NotificationType,
  NotificationOptionType,
} from '../types/typesNotifications';
import { UserWithId } from '../../../types/userType';
import { Timestamp } from 'firebase/firestore';

export const useNotification = (): {
  createNotification: (
    userId: string,
    projectId: string,
    notificationOption: NotificationOptionType
  ) => void;
  createMultipleNotifications: (
    userIdsList: string[],
    projectId: string,
    notificationOption: NotificationOptionType
  ) => void;
  deleteNotification: (notificationId: string, userId: string) => void;
  markOpenNotification: (notificationList: string[]) => void;
} => {
  const { addDocument, updateDocument, getDocument, deleteDocument } =
    useFirestore();

  const createNotification = useCallback(
    async (
      userId: string,
      projectId: string,
      notificationOption: NotificationOptionType
    ) => {
      // get user
      const userDoc = await getDocument<UserWithId>('users', userId);
      if (userDoc === undefined) return;
      // create notification
      const newNotification: NotificationType = {
        type: notificationOption,
        userId,
        projectId,
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

  const markOpenNotification = useCallback(
    async (notificationList: string[]) => {
      await Promise.all(
        notificationList.map(async (notificationDocId) => {
          console.log(notificationDocId);

          await updateDocument('notifications', notificationDocId, {
            isOpened: true,
          });
        })
      );
    },
    []
  );

  const createMultipleNotifications = useCallback(
    async (
      userIdsList: string[],
      projectId: string,
      notificationOption: NotificationOptionType
    ) => {
      await Promise.all(
        userIdsList.map(async (userId) => {
          await createNotification(userId, projectId, notificationOption);
        })
      );
    },
    []
  );

  return {
    createNotification,
    deleteNotification,
    markOpenNotification,
    createMultipleNotifications,
  };
};
