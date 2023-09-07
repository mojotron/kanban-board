import MenuList from './MenuList';

const buttons = [
  { text: 'logout' },
  { text: 'profile' },
  { text: 'create project' },
  { text: 'find project' },
  { text: 'find developer' },
];

const AsideMenu = () => {
  return (
    <aside>
      <button>Hide/Show</button>
      <h2>Kanban Board</h2>
      <MenuList buttons={buttons} />
    </aside>
  );
};

export default AsideMenu;
