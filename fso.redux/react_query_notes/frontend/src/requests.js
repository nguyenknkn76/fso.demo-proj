import axios from "axios";

const baseUrl = 'http://localhost:3001/notes'

const getNotes = () => 
    axios.get(baseUrl).then(res => res.data)

const createNote = newNote => 
    axios.post(baseUrl, newNote).then(res=> res.data)

const updateNote = (newNote) => 
    axios.put(`${baseUrl}/${newNote.id}`,newNote).then(res=> res.data)


export {getNotes, createNote, updateNote}