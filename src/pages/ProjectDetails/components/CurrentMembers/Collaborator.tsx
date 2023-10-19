import Avatar from '../../../../components/Avatar/Avatar';

type PropsType = {
  userName: string;
  imageUrl: string;
};

const Collaborator = ({ userName, imageUrl }: PropsType) => {
  return (
    <div>
      <p>{userName}</p>
      <Avatar userName={userName} imageUrl={imageUrl} size="25" />
    </div>
  );
};

export default Collaborator;
