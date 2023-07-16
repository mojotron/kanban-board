import './Task.css';
import { TaskType } from '../../types/taskType';

type Props = {
  taskData: TaskType & { id: string };
};

const Task = ({ taskData }: Props) => {
  return (
    <article className="Task">
      <header className={`Task__header priority--${taskData.priority}`}>
        <h3 className="Task__header__heading">{taskData.title}</h3>
      </header>
      <main className={`Task__body`}>
        <p className="Task__body__description">{taskData.description}</p>
      </main>
    </article>
  );
};

export default Task;
