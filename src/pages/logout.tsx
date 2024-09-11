import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedAtom } from "../atoms/useratoms";

export default function Logout() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedAtom);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update Recoil state to reflect logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="  text-red-600  font-semibold  hover:text-red-700  "
    >
      Logout
    </button>
  );
}
