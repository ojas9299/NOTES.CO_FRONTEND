import { useState, useEffect } from "react";
import api from "../api/axiosinstance.ts";
import { InputBase, Paper } from "@mui/material";
import SidebarComponent from "./drawer.tsx";
import { useRecoilValue } from "recoil";
import { notesAtom } from "../atoms/notesatom.tsx";
import Logout from "./logout.tsx";
import { isLoggedAtom } from "../atoms/useratoms.tsx";

const Navbar = () => {
  const notes = useRecoilValue(notesAtom);
  const [tags, setTags] = useState([]);
  const isLoggedIn = useRecoilValue(isLoggedAtom);

  // Fetch tags on component mount
  useEffect(() => {
    api
      .get("/api/tags")
      .then((response) => setTags(response.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, [notes]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-0 lg:pr-12">
        <div className="flex justify-between items-center h-16">
          <SidebarComponent tags={tags} />
          <a href="/landingpage" className="text-2xl font-bold text-gray-600">
            Notes.co⚡
          </a>
          <div className="flex-grow mx-16 rounded-lg border-2 border-gray-50 mt-1">
            <Paper
              component="form"
              className="flex items-center p-1 pl-12"
              elevation={0}
              sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}
            >
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                fullWidth
              />
            </Paper>
          </div>
          <div className="flex space-x-7">
            <a href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-800">
              About
            </a>
            <a href="/services" className="text-gray-600 hover:text-gray-800">
              Services
            </a>
            {isLoggedIn ? <Logout /> : ""}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
