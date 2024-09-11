import { atom } from "recoil";

export interface User {
  email: string;
  password: string;
}

export const useratom = atom<User[]>({
  key: "useratom",
  default: [],
});

export const isLoggedAtom = atom({
  key: "isLoggedAtom",
  default: false,
});

export const emailAtom = atom<string>({
  key: "emailAtom",
  default: "Guest@.com",
});
