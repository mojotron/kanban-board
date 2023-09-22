import { useCallback } from 'react';
import { useUserData } from '../context/UserDataContext';

import { useFirestore } from './useFirestore';
import { MessageType } from '../types/messageType';
import { Timestamp } from 'firebase/firestore';
import { useProject } from '../context/ProjectContext';

export const useMessages = (
  projectId: string
): {
  addMessage: (text: string, msgList: string[]) => void;
  updateMessage: (docId: string, text: string) => void;
  deleteMessage: (docId: string, msgList: string[]) => void;
} => {
  const { document: currentUser } = useUserData();
  const { project } = useProject();

  const { addDocument, updateDocument, deleteDocument } = useFirestore();

  const addMessage = useCallback(async (text: string, msgList: string[]) => {
    if (!currentUser || !project) return;

    try {
      const newMessage: MessageType = {
        text,
        authorUid: currentUser.uid,
        createdAt: Timestamp.fromDate(new Date()),
      };
      const doc = await addDocument<MessageType>('messages', newMessage);

      await updateDocument('projects', projectId, {
        messages: [...msgList, doc?.id],
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }, []);

  const updateMessage = useCallback(async (docId: string, text: string) => {
    await updateDocument('messages', docId, { text: text });
  }, []);

  const deleteMessage = useCallback(
    async (docId: string, msgList: string[]) => {
      if (!project) return;

      const filteredMessages = msgList.filter((doc) => doc !== docId);
      await deleteDocument('messages', docId);
      await updateDocument('projects', projectId, {
        messages: filteredMessages,
      });
    },
    []
  );

  return {
    addMessage,
    updateMessage,
    deleteMessage,
  };
};
