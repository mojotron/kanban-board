import './Task.css';

type PropsType = {
  title: string;
  description: string;
};

const Task = ({ title, description }: PropsType) => {
  return (
    <article className="Task">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

export default Task;
