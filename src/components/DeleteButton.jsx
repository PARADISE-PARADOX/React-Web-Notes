import React from "react";
import Trash from "../Icons/Trash";
import { db } from "../appwrite/databases";

const DeleteButton = ({ noteId, setNotes }) => {
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
