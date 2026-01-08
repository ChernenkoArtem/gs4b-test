import './App.css';
import Filters from '../components/filters/Filters.tsx';
import FiltersProvider from '../context/FiltersContext.tsx';
import KanbanBoard from '../components/kanban-board/KanbanBoard.tsx';
import { ModalProvider } from '../context/ModalContext.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FiltersProvider>
        <ModalProvider>
          <>
            <Filters />
            <KanbanBoard />
          </>
        </ModalProvider>
      </FiltersProvider>
    </LocalizationProvider>
  );
}

export default App;
