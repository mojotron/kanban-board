import styles from './TagsList.module.css';

type PropsType = {
  tags: string[];
};

const TagsList = ({ tags }: PropsType) => {
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
