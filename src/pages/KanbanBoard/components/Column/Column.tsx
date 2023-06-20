import './Column.css';
import Task from '../Task/Task';

type PropsType = {
  title: string;
};

const Column = ({ title }: PropsType) => {
  return (
    <div className="Column">
      <header className="Column__Header">
        <h2>{title}</h2>
      </header>
      <main className="Column__Tasks">
        <Task title="test" description="this is test task" />
      </main>
    </div>
  );
};

export default Column;
