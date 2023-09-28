// hooks
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useIsCurrentUser } from '../../hooks/useIsCurrentUser';
// types
import { ProjectWithId } from '../../types/projectType';
// styles
import styles from './ProjectCard.module.css';
// icon
import { MdMoveToInbox as OpenIcon } from 'react-icons/md';
// components
import Avatar from '../Avatar/Avatar';
import ExpandedText from '../ExpandedText/ExpandedText';
import AdminAvatar from '../AdminAvatar/AdminAvatar';

type PropsType = {
  data: ProjectWithId;
};

const ProjectCard = ({ data }: PropsType) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userData: creator } = useIsCurrentUser(userId);

  return (
    <article className={styles.projectCard}>
      <header className={styles.header}>
        <h2>{data.name}</h2>
        <Link to={`/project/${data.id}`}>
          <OpenIcon size={30} />
        </Link>

        {creator && <AdminAvatar admin={creator} />}
      </header>

      <div className={styles.body}>
        {data.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
        <p>Tasks {data.tasks.length}</p>
        {/* <p>Project created: {formatLocalDate(new Date(data.createdAt.seconds / 1000))}</p> */}
        <ExpandedText
          text={data.description}
          hideWordsLength={10}
          className="text"
        />
      </div>
      {creator?.uid !== data.adminUid && <button>Join</button>}
    </article>
  );
};

export default ProjectCard;
