import { useEffect } from 'react';
import { useStore } from '../store';
import { doc, onSnapshot } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase/config';
import { UserType } from '../types/userType';

export const useOnSnapshotDocument = (
  collectionName: string,
  docId: string | null
) => {
  const setUser = useStore((store) => store.setUser);

  useEffect(() => {
    if (docId === null) return;
    let unsubscribe: () => void;

    const getDocument = async () => {
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        unsubscribe = onSnapshot(docRef, (doc) => {
          const docData = { ...doc.data(), id: doc.id };
          setUser(docData as UserType);
        });
      } catch (error) {}
    };

    getDocument();

    return () => unsubscribe();
  }, []);
};
