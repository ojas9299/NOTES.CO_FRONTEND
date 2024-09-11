import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosinstance";
import ModalComponent from "./modal";
import { useSetRecoilState, useRecoilState } from "recoil";
import { selectedNoteState, isModalOpenState, Notes } from "../atoms/notesatom";

const TagPage = () => {
  const { tag } = useParams();
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const setSelectedNote = useSetRecoilState(selectedNoteState);

  const colors = [
    "bg-red-100", // Light Red
    "bg-blue-100", // Light Blue
    "bg-green-100", // Light Green
    "bg-yellow-100", // Light Yellow
    "bg-purple-100", // Light Purple
    "bg-pink-100", // Light Pink
    "bg-gray-100", // Light Gray
    "bg-teal-100", // Light Teal
    "bg-indigo-100", // Light Indigo
    "bg-orange-100", // Light Orange
    "bg-cyan-100", // Light Cyan
    "bg-lime-100", // Light Lime
    "bg-rose-100", // Light Rose
    "bg-amber-100", // Light Amber
    "bg-violet-100", // Light Violet
    "bg-fuchsia-100", // Light Fuchsia
    "bg-red-200", // Slightly darker Red
    "bg-blue-200", // Slightly darker Blue
    "bg-green-200", // Slightly darker Green
    "bg-yellow-200", // Slightly darker Yellow
    "bg-purple-200", // Slightly darker Purple
    "bg-pink-200", // Slightly darker Pink
    "bg-gray-200", // Slightly darker Gray
    "bg-teal-200", // Slightly darker Teal
    "bg-indigo-200", // Slightly darker Indigo
    "bg-orange-200", // Slightly darker Orange
    "bg-cyan-200", // Slightly darker Cyan
    "bg-lime-200", // Slightly darker Lime
    "bg-rose-200", // Slightly darker Rose
    "bg-amber-200", // Slightly darker Amber
    "bg-violet-200", // Slightly darker Violet
    "bg-fuchsia-200", // Slightly darker Fuchsia
  ];

  useEffect(() => {
    const fetchNotes = async () => {
      if (tag) {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("No token found");
            return;
          }

          const response = await api.get(`/api/notes/${tag}`);

          setNotes(response.data);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };

    fetchNotes();
  }, [tag, setNotes]);

  const handleNoteClick = (note: Notes) => {
    setSelectedNote({ ...note });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note: Notes) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={note._id}
              onClick={() => handleNoteClick(note)}
              className={`p-6 border border-gray-300 rounded-xl shadow-xl hover:bg-gray-50 transition-transform transform hover:scale-105 cursor-pointer ${randomColor}`}
              style={{ height: "400px" }}
            >
              <h2 className="text-2xl font-bold mb-10 text-gray-800">
                {note.title}
              </h2>
              <pre className="whitespace-pre-wrap text-gray-700 mb-4 overflow-y-auto scrollbar-hide text-ellipsis break-words pb-10 pr-2 max-h-60">
                {note.content}
              </pre>
              <p className="mt-4 text-gray-500 absolute bottom-3">
                {note.tags && note.tags.length > 0
                  ? note.tags.map((tag: any, index: number) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 text-gray-800 text-sm px-4 py-1 rounded-full mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))
                  : "No tags"}
              </p>
            </div>
          );
        })}
      </div>
      <ModalComponent open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TagPage;
