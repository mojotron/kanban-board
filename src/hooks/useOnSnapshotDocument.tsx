import { useEffect } from 'react';
import { useStore } from '../store';
import { doc, onSnapshot } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase/config';

export const useOnSnapshotDocument = (
  collectionName: string,
  docId: string
) => {
  useEffect(() => {
    if (docId === null) return;
    let unsubscribe: () => void;

    const getDocument = async () => {
      try {
        const docRef = doc(firebaseFirestore, collectionName, docId);
        unsubscribe = onSnapshot(docRef, (doc) => {
          const docData = { ...doc.data, id: doc.id };
          // set data
        });
      } catch (error) {}
    };

    return () => unsubscribe();
  }, []);
};
