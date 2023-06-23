import { Router, RouterProvider } from '@tanstack/router';
// pages
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';

const routes = [
  {
    path: '/',
    element: (
      <>
        <KanbanBoard />
      </>
    ),
  },
];

const router = new Router(routes);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router}>
        <KanbanBoard />
      </RouterProvider>
    </div>
  );
};

export default App;
