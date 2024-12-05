import React from "react";
import { fakeData as notes } from "../assets/fakeData.js";
import NoteCard from "../components/NoteCard";

const NotePages = () => {
  return (
    <div>
      {notes.map((note) => {
        return <NoteCard key={note.$id} note={note} />;
      })}
    </div>
  );
};

export default NotePages;
