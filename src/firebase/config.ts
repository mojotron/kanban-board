import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlubf-y7WYjlTHp8f9j17WD3mrYf9BC5U',
  authDomain: 'kanban-board-899e2.firebaseapp.com',
  projectId: 'kanban-board-899e2',
  storageBucket: 'kanban-board-899e2.appspot.com',
  messagingSenderId: '1008240957402',
  appId: '1:1008240957402:web:6eb4d37277aeea11d512e3',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseFirestore = getFirestore(firebaseApp);

export { firebaseFirestore };
