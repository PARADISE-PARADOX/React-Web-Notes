import React, { useContext } from "react";
import Trash from "../Icons/Trash";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);
  const DelHandler = async () => {
    db.notes.delete(noteId);
    setNotes((prev) => prev.filter((note) => note.$id !== noteId));
  };
  return (
    <div onClick={DelHandler}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
