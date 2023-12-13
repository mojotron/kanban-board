import { useProject } from '../../../../context/ProjectContext';
import Call from './Call';
import CallsList from './CallsList';
//
import styles from './Calls.module.css';

const Calls = () => {
  const { project } = useProject();

  if (!project) return null;

  const hasRequests = project.requests.length > 0;
  const hasInvites = project.invites.length > 0;

  return (
    <div className={styles.calls}>
      {hasRequests ? (
        <div>
          <h2>Requests</h2>
          <CallsList>
            {project.requests.map((request) => (
              <Call
                key={request.createdAt.seconds}
                type="request"
                call={request}
              />
            ))}
          </CallsList>
        </div>
      ) : null}

      {hasInvites ? (
        <div>
          <h2>Invites</h2>
          <CallsList>
            {project.invites.map((invite) => (
              <Call
                key={invite.createdAt.seconds}
                type="invite"
                call={invite}
              />
            ))}
          </CallsList>
        </div>
      ) : null}
    </div>
  );
};

export default Calls;
