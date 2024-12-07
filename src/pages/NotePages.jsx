import NoteCard from "../components/NoteCard";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Control from "../components/Control";

const NotePages = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map((note) => {
        return <NoteCard key={note.$id} note={note} />;
      })}
      <Control />
    </div>
  );
};

export default NotePages;
