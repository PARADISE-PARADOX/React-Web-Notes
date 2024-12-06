import React from "react";
// import { fakeData as notes } from "../assets/fakeData.js";
import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import { databases } from "../appwrite/config";
import { db } from "../appwrite/databases";

const NotePages = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    // const response = await databases.listDocuments(
    //   import.meta.env.VITE_DATABASE_ID,
    //   import.meta.env.VITE_COLLECTION_NOTES_ID
    // );

    setNotes(response.documents);
  };

  return (
    <div>
      {notes.map((note) => {
        return <NoteCard key={note.$id} note={note} setNotes={setNotes} />;
      })}
    </div>
  );
};

export default NotePages;
