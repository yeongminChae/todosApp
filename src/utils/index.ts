import { DropResult } from "react-beautiful-dnd";
import { SetterOrUpdater } from "recoil";
import { IToDoState } from "../atoms";

export const onDragEndUtills = (
  info: DropResult,
  setBoards: SetterOrUpdater<string[]>,
  setToDos: SetterOrUpdater<IToDoState>,
  setTrashCan: SetterOrUpdater<boolean>
) => {
  const { destination, source } = info;
  if (!destination) return;

  setTrashCan(true);

  if (source.droppableId === "boards") {
    setBoards((prev) => {
      const boardCopy = [...prev];
      const taskObj = boardCopy.splice(source.index, 1)[0];
      boardCopy.splice(destination.index, 0, taskObj);
      return boardCopy;
    });
  } else if (destination.droppableId === "trashcan") {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[source.droppableId]];
      boardCopy.splice(source.index, 1);
      return { ...allBoards, [source.droppableId]: boardCopy };
    });
  } else if (destination?.droppableId === source.droppableId) {
    // same board movements
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[source.droppableId]];
      const taskObj = boardCopy.splice(source.index, 1)[0];
      // const taskObj = boardCopy[source.index];
      // boardCopy.splice(source.index, 1);
      boardCopy.splice(destination.index, 0, taskObj);
      return { ...allBoards, [source.droppableId]: boardCopy };
    });
  } else if (destination.droppableId !== source.droppableId) {
    // cross board movement
    setToDos((allBoards) => {
      const sourceBoard = [...allBoards[source.droppableId]];
      const destinationBoard = [...allBoards[destination.droppableId]];
      const taskObj = sourceBoard.splice(source.index, 1)[0];
      // const taskObj = sourceBoard[source.index];
      // sourceBoard.splice(source.index, 1);
      destinationBoard.splice(destination?.index, 0, taskObj);
      return {
        ...allBoards,
        [source.droppableId]: sourceBoard,
        [destination.droppableId]: destinationBoard,
      };
    });
  }
};
