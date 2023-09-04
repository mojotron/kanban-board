import { useEffect, useState } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { ProjectWithId } from '../../../types/projectType';
import { UserWithId } from '../../../types/userType';
import './ProjectCard.css';
import Avatar from '../../../components/Avatar/Avatar';
import ExpandedText from '../../../components/ExpandedText/ExpandedText';
import { formatLocalDate } from '../../../utils/formatTime';

type PropsType = {
  data: ProjectWithId;
};

const ProjectCard = ({ data }: PropsType) => {
  const { getDocument } = useFirestore();
  const [creator, setCreator] = useState<UserWithId | null>(null);

  useEffect(() => {
    getDocument<UserWithId>('users', data.adminUid).then((user) =>
      setCreator(user ? user : null)
    );
  }, [getDocument, data]);

  return (
    <article className="ProjectCard">
      <h2>{data.name}</h2>
      {creator && (
        <Avatar
          imageUrl={creator?.photoUrl}
          size="25"
          userName={creator?.userName}
        />
      )}
      <h3>{creator?.userName}</h3>
      <div>
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
      {creator?.id !== data.adminUid && <button>Join</button>}
    </article>
  );
};

export default ProjectCard;
