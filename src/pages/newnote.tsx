import { useState } from "react";
import api from "../api/axiosinstance";
import { notesAtom, Notes } from "../atoms/notesatom";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function NewNote() {
  const setnotes = useSetRecoilState<Notes[]>(notesAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTags = e.target.value.split(",").map((tag) => tag.trim());
    setTags(inputTags);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote: Notes = {
      title,
      content,
      tags,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await api.post("/api/notes", newNote);

      setnotes((prevnotes) => [...prevnotes, response.data]);

      setTitle("");
      setContent("");
      setTags([]);
      navigate("/landingpage");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 max-w-md mx-auto border rounded-md shadow-md"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Tags (Comma Separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags.join(", ")}
          onChange={handleTagsChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., travel, work, personal"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Note
      </button>
    </form>
  );
}
