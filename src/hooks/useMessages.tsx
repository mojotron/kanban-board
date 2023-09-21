import { useCallback } from 'react';
import { useUserData } from '../context/UserDataContext';
import { useCollectDocsSnapshot } from './useCollectDocsSnapshot';
import { useFirestore } from './useFirestore';
import { MessageTypeWithId, MessageType } from '../types/messageType';
import { Timestamp } from 'firebase/firestore';

export const useMessages = (
  ids: string[]
): {
  messages: MessageTypeWithId[] | undefined;
  pending: boolean;
  error: null | string;
  addMessage: (text: string) => void;
  updateMessage: (docId: string, text: string) => void;
  deleteMessage: (docId: string) => void;
} => {
  console.log('>>>>>>>>', ids);
  const { document: currentUser } = useUserData();
  const {
    documents: messages,
    pending,
    error,
  } = useCollectDocsSnapshot<MessageTypeWithId>(ids, 'messages');

  const { addDocument, updateDocument, deleteDocument } = useFirestore();

  const addMessage = useCallback(async (text: string) => {
    if (!currentUser) return;

    try {
      const newMessage: MessageType = {
        text,
        authorUid: currentUser.uid,
        createdAt: Timestamp.fromDate(new Date()),
      };
      const doc = await addDocument<MessageType>('messages', newMessage);
      const msg = messages?.map((doc) => doc.id) || [];
      await updateDocument('projects', project.id, {
        messages: [...msg, doc?.id],
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }, []);

  const updateMessage = useCallback(async (docId: string, text: string) => {
    if (!messages) return;
    await updateDocument('messages', docId, { text: text });
  }, []);

  const deleteMessage = useCallback(async (docId: string) => {
    if (!messages) return;
    const filteredMessages = messages.filter((msg) => msg.id !== docId);
    await deleteDocument('messages', docId);
    await updateDocument('projects', project.id, {
      messages: filteredMessages,
    });
  }, []);

  return {
    messages,
    pending,
    error,
    addMessage,
    updateMessage,
    deleteMessage,
  };
};
