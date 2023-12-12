import { InviteType } from '../../../../types/inviteType';

type PropsType = {
  invite: InviteType;
  // onReject: () => void;
  // onAccept: () => void;
};

const Invite = ({ invite }: PropsType) => {
  return <div>Invite</div>;
};

export default Invite;
