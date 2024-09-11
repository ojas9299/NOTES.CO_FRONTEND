import { atom } from "recoil";

export interface Notes {
  _id?: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const notesAtom = atom<Notes[]>({
  key: "notesAtoms",
  default: [],
});

export const selectedNoteState = atom<Notes | null>({
  key: "selectedNoteState",
  default: null,
});

export const isModalOpenState = atom<boolean>({
  key: "isModalOpenState",
  default: false,
});

export const tagsAtom = atom({
  key: "tagsAtom",
  default: [],
});
