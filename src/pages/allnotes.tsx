import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  notesAtom,
  selectedNoteState,
  isModalOpenState,
  Notes,
} from "../atoms/notesatom";
import ModalComponent from "./modal";
import { isLoggedAtom } from "../atoms/useratoms.tsx";
import api from "../api/axiosinstance";

export default function AllNotes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notes, setNotes] = useRecoilState(notesAtom);
  const setSelectedNote = useSetRecoilState(selectedNoteState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [isLoggedIn, setisLoggedIn] = useRecoilState(isLoggedAtom);
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
      try {
        const token = localStorage.getItem("token");
        if (token) setisLoggedIn(true);
        const response = await api.get("/api/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteClick = (note: Notes) => {
    setSelectedNote({ ...note });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      setIsModalOpen(false);
    };
  }, [location.pathname, setIsModalOpen]);

  return (
    <>
      {isLoggedIn ? (
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">All Notes</h1>
          <button
            onClick={() => navigate("/newnote")}
            className="mb-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Note
          </button>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => {
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
              return (
                <div
                  key={index}
                  onClick={() => handleNoteClick(note)}
                  className={`p-6 border border-gray-300 rounded-xl shadow-xl ${randomColor} hover:bg-gray-50 transition-transform transform hover:scale-105 cursor-pointer ${
                    index % 4 === 0
                      ? "col-span-2 row-span-2"
                      : "col-span-1 row-span-1"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {note.title}
                  </h2>
                  <pre
                    className={`whitespace-pre-wrap text-gray-700 mb-2 overflow-y-auto break-words pb-10 pr-2 ${
                      index % 4 === 0
                        ? "w-[600px] text-2xl max-h-[300px] px-12"
                        : "w-72 max-h-40"
                    } scrollbar-hide`}
                  >
                    {note.content}
                  </pre>
                  <div className="mt-4 text-gray-500 absolute bottom-3">
                    {note.tags && note.tags.length > 0
                      ? note.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-200 text-gray-800 text-sm px-4 py-1 rounded-full mr-2 mb-2"
                          >
                            {tag}
                          </span>
                        ))
                      : "No tags"}
                  </div>
                </div>
              );
            })}
          </div>
          <ModalComponent open={isModalOpen} onClose={handleCloseModal} />
        </div>
      ) : (
        <div className="p-6 max-w-6xl mx-auto text-center mt-20">
          <h1 className="text-2xl font-bold mb-4 text-black">
            Please log in to view notes.
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Login
          </button>
        </div>
      )}
    </>
  );
}
