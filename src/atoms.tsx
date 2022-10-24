import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}

export const toDostate = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO": [],
    Doing: [],
    Done: [],
  },
});
