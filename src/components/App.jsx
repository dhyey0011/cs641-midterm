import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "../App.css";
import { defNotes } from "../Notes";

function App() {
  const [notes, setNotes] = useState(defNotes);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectAll, setSelectAll] = useState(false); 

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((noteItem, index) => index !== id));
    setSelectedNotes((prevSelected) =>
      prevSelected.filter((selectedId) => selectedId !== id)
    );
  }

  function selectNote(id) {
    if (selectedNotes.includes(id)) {
      setSelectedNotes((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedNotes((prevSelected) => [...prevSelected, id]);
    }
  }

  function deleteSelectedNotes() {
    const sortedSelectedNotes = [...selectedNotes].sort((a, b) => b - a);

    sortedSelectedNotes.forEach((id) => {
      setNotes((prevNotes) => prevNotes.filter((noteItem, index) => index !== id));
    });

    setSelectedNotes([]);
  }
  function onSelectAll() {
    if (selectAll) {
      setSelectedNotes([]);
    } else {
      const allNoteIds = notes.map((_, index) => index);
      setSelectedNotes(allNoteIds);
    }
    setSelectAll(!selectAll);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} onDeleteSelected={deleteSelectedNotes} selectedNotes={selectedNotes}  onSelectAll={onSelectAll}/>
      <div className="note-list">
      {notes.map((noteItem, index) => {
        const isSelected = selectedNotes.includes(index);
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}x
            content={noteItem.content}
            onDelete={deleteNote}
            onSelect={selectNote}
            isSelected={isSelected}
          />
        );
      })}
    </div>
      <Footer />
    </div>
  );
}

export default App;
