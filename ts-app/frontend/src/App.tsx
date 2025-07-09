import { useEffect, useState } from "react";
import NoteService from "./services/note.service";
import type { CoursePart } from "./types/Course.type";

interface Note {
  id: string, 
  content: string
}

const assertNever = (value: never) => {
  throw new Error(
    `Unhandled discriminated union mejmber: ${JSON.stringify(value)}`
  );
}

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'testing' }
  ]);
  const PORT = import.meta.env.PORT
  useEffect (() => {
    NoteService.getAllNotes()
      .then(data => {
        setNotes(data)
      });
  });
  // const courseName = "Half stack app dev";
  const coursePart : CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "Just try",
      kind: "basic",
    },
  ]

  const createNote = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(PORT)
    NoteService.create({content: newNote})
      .then(data => {
        setNotes(notes.concat(data));
      });
    // const noteToAdd = {
    //   content: newNote,
    //   id: String(notes.length + 1)
    // };
    // setNotes(notes.concat(noteToAdd));
    setNewNote('');
  };
  return (
    <>
      <div>
        <ul>
          {notes.map(note =>
            <li key={note.id}>{note.content}</li>
          )}
        </ul>
      </div>

      <div>
        <form onSubmit={createNote}>
          <input
            value={newNote}
            onChange={(e)=> setNewNote(e.target.value)}
          />
          <button type="submit">add</button>
        </form>
      </div>

      {/*! COURSE HERE */}
      {coursePart.forEach(part => {
        switch(part.kind){
          case "basic":
            console.log(part.name, part.description, part.exerciseCount, part.kind);
            break;
          case "background":
            console.log(part.name, part.description, part.exerciseCount, part.backgroundMaterial, part.kind);
            break;
          case "group":
            console.log(`case group here: ${part.kind}`);
            break;
          default: 
            return assertNever(part);
        }
      })}
    </>
  );
}

export default App
