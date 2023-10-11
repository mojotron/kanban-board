import { UserWithId } from '../../types/userType';
import Avatar from '../Avatar/Avatar';
import styles from './AdminAvatar.module.css';
import { Link } from 'react-router-dom';

const AdminAvatar = ({ admin }: { admin: UserWithId | undefined }) => {
  if (!admin) return null;

  return (
    <Link to={`/${admin.id}`} className={styles.admin}>
      <h3>Admin</h3>
      <Avatar imageUrl={admin.photoUrl} size="50" userName={admin.userName} />
      <h3>{admin.userName}</h3>
    </Link>
  );
};

export default AdminAvatar;
