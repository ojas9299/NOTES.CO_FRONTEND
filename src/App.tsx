import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedAtom } from "./atoms/useratoms";
import Login from "./pages/login";
import Register from "./pages/register";
import Landingpage from "./pages/landingpage";
import NewNote from "./pages/newnote";
import Editnote from "./pages/editnote";
import Navbar from "./pages/navbar";
import TagPage from "./pages/tag";

export default function App() {
  const isLoggedIn = useRecoilValue(isLoggedAtom);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/newnote" element={<NewNote />} />
        <Route path="/:id/edit" element={<Editnote />} />
        <Route path="/:tag" element={<TagPage />} />
      </Routes>
    </Router>
  );
}
