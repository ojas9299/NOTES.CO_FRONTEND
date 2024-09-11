import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import { emailAtom } from "../atoms/useratoms";
import { useRecoilValue } from "recoil";

interface SidebarComponentProps {
  tags: string[];
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ tags }) => {
  const email = useRecoilValue(emailAtom);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleSidebar2 = () => {
    setIsOpen(false);
  };

  function getUsernameFromEmail(email: string): string {
    const atIndex = email.indexOf("@");
    if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
      console.log("Invalid email address format");
    }

    return email.substring(0, atIndex);
  }

  const username = getUsernameFromEmail(email);

  return (
    <div
      onMouseLeave={toggleSidebar2}
      className={`flex transition-all duration-300 ${isOpen ? "ml-0" : "ml-0"}`}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-[65px] left-0 h-full  bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "200px",
        }}
      >
        <div className="my-5 mx-[30px]">
          <h3 className="p-2">{username}</h3>
          <div className=" mb-10 font-medium text-2xl text-gray-800 hover:text-gray-950 cursor-pointer transition duration-400 ease-in-out transform hover:scale-110  p-2 rounded-r-full text-left">
            <a href="/landingpage">
              <HomeRoundedIcon className="text-[#fb8128]" /> Home
            </a>
          </div>

          <div>
            {tags.map((tag) => (
              <ul key={tag} className="mb-2">
                <li
                  onClick={() => navigate(`/${tag}`)}
                  className="text-xl text-gray-800 hover:text-gray-950 cursor-pointer transition duration-400 ease-in-out transform hover:scale-110 hover:bg-gray-300 p-2 rounded-r-full text-left"
                >
                  ⚡{tag}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-6">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onMouseEnter={toggleSidebar}
          className="mr-2 mt-1"
        >
          {!isOpen ? (
            <MenuIcon className="text-gray-800" />
          ) : (
            <KeyboardDoubleArrowRightIcon className="text-gray-800" />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default SidebarComponent;
