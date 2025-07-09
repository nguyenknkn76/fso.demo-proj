import axios from "axios";
import type { Note, NewNote } from "../types/Note.type";

const PORT = import.meta.env.VITE_PORT
const baseUrl = `http://localhost:${PORT}/notes`;

const getAllNotes = () => {
  return axios
    .get<Note[]>(baseUrl)
    .then(res=> res.data);
};

const create = (object: NewNote) => {
  return axios
    .post<Note>(baseUrl, object)
    .then(res => res.data)
};

export default {
  create,
  getAllNotes
}

