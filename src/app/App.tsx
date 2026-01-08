import './App.css';
import Filters from '../components/filters/Filters.tsx';
import FiltersProvider from '../context/FiltersContext.tsx';
import KanbanBoard from '../components/kanban-board/KanbanBoard.tsx';
import { ModalProvider } from '../context/ModalContext.tsx';

function App() {
  return (
    <>
      <FiltersProvider>
        <ModalProvider>
          <>
            <Filters />
            <KanbanBoard />
          </>
        </ModalProvider>
      </FiltersProvider>
    </>
  );
}

export default App;
