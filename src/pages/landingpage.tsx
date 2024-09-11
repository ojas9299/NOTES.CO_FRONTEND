import { useRecoilValue } from "recoil";
import { isLoggedAtom } from "../atoms/useratoms";
import AllNotes from "./allnotes.tsx";

export default function Landingpage() {
  const isLoggedIn = useRecoilValue(isLoggedAtom);

  return (
    <>
      <div>
        <AllNotes />
      </div>
    </>
  );
}
