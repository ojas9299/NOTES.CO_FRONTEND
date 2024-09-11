import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedAtom } from "./atoms/useratoms.tsx";
import Login from "./pages/login.tsx";
import Landingpage from "./pages/landingpage.tsx";
import NewNote from "./pages/newnote.tsx";
import Editnote from "./pages/editnote.tsx";
import Navbar from "./pages/navbar.tsx";
import TagPage from "./pages/tag.tsx";

export default function App() {
  const isLoggedIn = useRecoilValue(isLoggedAtom);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/newnote" element={<NewNote />} />
        <Route path="/:id/edit" element={<Editnote />} />
        <Route path="/:tag" element={<TagPage />} />
      </Routes>
    </Router>
  );
}
