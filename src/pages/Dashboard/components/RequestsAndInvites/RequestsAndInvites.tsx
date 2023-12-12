import { useProject } from '../../../../context/ProjectContext';
import Invite from './Invite';
import Request from './Request';
import RequestsAndInvitesList from './RequestsAndInvitesList';

const RequestsAndInvites = () => {
  const { project } = useProject();

  if (!project) return null;

  const hasRequests = project.requests.length > 0;
  const hasInvites = project.invites.length > 0;

  return (
    <div>
      {hasRequests ? (
        <div>
          <h2>Requests</h2>
          <RequestsAndInvitesList>
            {project.requests.map((request) => (
              <Request key={request.createdAt.seconds} request={request} />
            ))}
          </RequestsAndInvitesList>
        </div>
      ) : null}

      {hasInvites ? (
        <div>
          <h2>Invites</h2>
          <RequestsAndInvitesList>
            {project.invites.map((invite) => (
              <Invite key={invite.createdAt.seconds} invite={invite} />
            ))}
          </RequestsAndInvitesList>
        </div>
      ) : null}
    </div>
  );
};

export default RequestsAndInvites;
