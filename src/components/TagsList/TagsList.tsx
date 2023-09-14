type PropsType = {
  tags: string[];
};

const TagsList = ({ tags }: PropsType) => {
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
