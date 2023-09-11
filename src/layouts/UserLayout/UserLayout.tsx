import { Outlet } from 'react-router-dom';
// styles
import styles from './UserLayout.module.css';
import AsideMenu from '../../components/AsideMenu/AsideMenu';

const UserLayout = () => {
  return (
    <div className={styles.userLayout}>
      <AsideMenu />
      <div className={styles.outletWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
