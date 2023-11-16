import HighlightText from '../../../components/HighlightText/HighlightText';

const LoginHeader = () => {
  return (
    <header className="Login__Header">
      <h1>
        <HighlightText size="big">Kanban Board</HighlightText>
      </h1>
      <p>
        Help visualize <HighlightText>work</HighlightText> with simple{' '}
        <HighlightText>project</HighlightText> management tool. Split project to
        small <HighlightText>tasks</HighlightText>. Build and organize{' '}
        <HighlightText>team</HighlightText> using github accounts.
      </p>
    </header>
  );
};

export default LoginHeader;
