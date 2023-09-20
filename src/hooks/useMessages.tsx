import { useCallback, useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { useUserData } from '../context/UserDataContext';
import { useCollectDocsSnapshot } from './useCollectDocsSnapshot';
import { useFirestore } from './useFirestore';
import { MessageTypeWithId, MessageType } from '../types/messageType';
import { Timestamp } from 'firebase/firestore';

export const useMessages = (): {
  messages: MessageTypeWithId[] | undefined;
  pending: boolean;
  error: null | string;
  addMessage: (data: string) => void;
  updateMessage: (docId: string, text: string) => void;
  deleteMessage: (docId: string) => void;
} => {
  const { document: currentUser } = useUserData();
  const { project } = useProject();
  const {
    documents: messages,
    pending,
    error,
  } = useCollectDocsSnapshot<MessageTypeWithId>(project?.messages, 'messages');
  const { addDocument, updateDocument, deleteDocument } = useFirestore();

  const [newMessageText, setNewMessageText] = useState('');
  const [updateMessageId, setUpdateMessageId] = useState<null | string>(null);

  const addMessage = useCallback(async (text: string) => {
    if (!project || !messages || !currentUser) return;
    const newMessage: MessageType = {
      text: text,
      authorUid: currentUser.uid,
      createdAt: Timestamp.fromDate(new Date()),
    };
    const doc = await addDocument<MessageType>('messages', newMessage);
    await updateDocument('projects', project.id, {
      messages: [...project.messages, doc?.id],
    });
  }, []);

  const updateMessage = useCallback(async (docId: string, text: string) => {
    if (!project || !messages) return;
    await updateDocument('messages', docId, { text: text });
  }, []);

  const deleteMessage = useCallback(async (docId: string) => {
    if (!project || !messages) return;
    const filteredMessages = messages.filter((msg) => msg.id !== docId);
    await deleteDocument('messages', docId);
    await updateDocument('projects', project.id, {
      messages: filteredMessages,
    });
  }, []);

  return { messages, pending, error, addMessage, updateMessage, deleteMessage };
};
