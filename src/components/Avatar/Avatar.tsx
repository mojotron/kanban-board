import styles from './Avatar.module.css';

type AvatarSize = '25' | '35' | '50' | '75' | '100';

type PropsType = {
  imageUrl: string;
  userName: string;
  size: AvatarSize;
  active?: boolean;
  hover?: boolean;
  title?: string | undefined;
};

const Avatar = ({
  imageUrl,
  userName,
  size,
  active,
  hover = false,
  title = undefined,
}: PropsType) => {
  return (
    <div
      className={`${styles.avatar} ${active ? styles.avatarActive : ''} ${
        hover ? styles.avatarHover : ''
      }`}
      style={{ width: `${size}px`, height: `${size}px` }}
      title={title}
    >
      <img className={styles.avatarImg} src={imageUrl} alt={userName} />
    </div>
  );
};

export default Avatar;
