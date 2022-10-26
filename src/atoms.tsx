import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});
export interface ITodo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDostate = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO'S": [],
    "⏳": [],
    "✅": [],
  },
  effects: [persistAtom],
});

export const IBoardState = atom<string[]>({
  key: "boards",
  default: ["TO DO'S", "⏳", "✅"],
  effects: [persistAtom],
});

export const TrashCanState = atom<boolean>({
  key: "trashcan",
  default: true,
});
