import './Avatar.css';

type AvatarSize = '50' | '100' | '200';

type PropsType = {
  imageUrl: string;
  userName: string;
  size: AvatarSize;
};

const Avatar = ({ imageUrl, userName, size }: PropsType) => {
  return (
    <div
      className={`Avatar`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img className="Avatar__img" src={imageUrl} alt={userName} />
    </div>
  );
};

export default Avatar;
