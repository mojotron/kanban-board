import { Dispatch, SetStateAction } from 'react';
import Button from '../../../../components/Button/Button';
import {
  BiDownArrow as IconOpen,
  BiUpArrow as IconClose,
} from 'react-icons/bi';
import styles from './NotificationsButton.module.css';

type PropsType = {
  newNotificationsCount: number;
  isOpen: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
};

const NotificationsButton = ({
  newNotificationsCount,
  isOpen,
  toggleOpen,
}: PropsType) => {
  return (
    <Button
      handleClick={() => toggleOpen(isOpen ? false : true)}
      className={styles.btnNotification}
    >
      Notifications{' '}
      {newNotificationsCount > 0 && (
        <span className={styles.notificationCount}>
          {newNotificationsCount}
        </span>
      )}{' '}
      {isOpen ? <IconClose /> : <IconOpen />}
    </Button>
  );
};

export default NotificationsButton;
