import './Avatar.css';

type AvatarSize = '25' | '50' | '75' | '100';

type PropsType = {
  imageUrl: string;
  userName: string;
  size: AvatarSize;
  active?: boolean;
};

const Avatar = ({ imageUrl, userName, size, active }: PropsType) => {
  return (
    <div
      className={`Avatar ${active ? 'Avatar--active' : ''}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img className="Avatar__img" src={imageUrl} alt={userName} />
    </div>
  );
};

export default Avatar;
