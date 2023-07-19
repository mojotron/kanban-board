import './Column.css';

type PropsType = {
  title: string;
};

const Column = ({ title }: PropsType) => {
  return (
    <div className="Column">
      <header className="Column__Header">
        <h2>{title}</h2>
      </header>
      <main className="Column__Tasks">hello</main>
    </div>
  );
};

export default Column;
