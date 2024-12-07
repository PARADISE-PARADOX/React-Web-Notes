import NotePages from "./pages/NotePages";
import NotesProvider from "./context/NoteContext";

function App() {
  return (
    <div id="app">
      <NotesProvider>
        <NotePages />
      </NotesProvider>
    </div>
  );
}

export default App;
