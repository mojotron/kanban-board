import { useEffect, useState } from 'react';
import { UserWithId } from '../../types/userType';
import Avatar from '../Avatar/Avatar';
import styles from './AdminAvatar.module.css';
import { Link } from 'react-router-dom';
import { useUserData } from '../../context/UserDataContext';
import { useFirestore } from '../../hooks/useFirestore';

type AdminType = {
  id: string;
  photoUrl: string;
  userName: string;
};

type PropsType =
  | {
      type: 'adminUid';
      data: string;
    }
  | {
      type: 'adminObject';
      data: UserWithId;
    };

const AdminAvatar = ({ type, data }: PropsType) => {
  const { document: user } = useUserData();
  const { getDocument } = useFirestore();

  const [admin, setAdmin] = useState<AdminType | undefined>(() =>
    type === 'adminObject'
      ? { id: data.uid, photoUrl: data.photoUrl, userName: data.userName }
      : undefined
  );

  useEffect(() => {
    if (!user || type === 'adminObject') return;
    if (user.uid === data) {
      setAdmin({
        id: user.uid,
        photoUrl: user.photoUrl,
        userName: user.userName,
      });
    } else {
      const getAdmin = async () => {
        const adminDoc = await getDocument<UserWithId>('users', data);
        if (!adminDoc) return;
        setAdmin({
          id: adminDoc?.id,
          photoUrl: adminDoc?.photoUrl,
          userName: adminDoc?.userName,
        });
      };
      getAdmin();
    }
  }, [user, type, data, getDocument]);

  if (admin === undefined) return null;

  return (
    <Link to={`/${admin.id}`} className={styles.admin}>
      <h3>Admin</h3>
      <Avatar imageUrl={admin.photoUrl} size="50" userName={admin.userName} />
      <h3>{admin.userName}</h3>
    </Link>
  );
};

export default AdminAvatar;
