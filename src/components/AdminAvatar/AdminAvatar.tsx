import { UserWithId } from '../../types/userType';
import Avatar from '../Avatar/Avatar';
import styles from './AdminAvatar.module.css';

const AdminAvatar = ({ admin }: { admin: UserWithId | undefined }) => {
  if (!admin) return null;

  return (
    <figure className={styles.admin}>
      <h3>Admin</h3>
      <Avatar imageUrl={admin.photoUrl} size="50" userName={admin.userName} />
      <h3>{admin.userName}</h3>
    </figure>
  );
};

export default AdminAvatar;
