import { useNavigate } from 'react-router-dom';
import Avatar from '../../../../components/Avatar/Avatar';
import styles from './Collaborator.module.css';

type PropsType = {
  userName: string;
  imageUrl: string;
  userId: string;
};

const Collaborator = ({ userName, imageUrl, userId }: PropsType) => {
  const navigate = useNavigate();

  return (
    <li className={styles.collaborator} onClick={() => navigate(`/${userId}`)}>
      <Avatar userName={userName} imageUrl={imageUrl} size="25" />
      <p>{userName}</p>
    </li>
  );
};

export default Collaborator;
