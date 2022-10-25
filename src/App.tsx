import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IBoardState, IToDoState, toDostate, TrashCanState } from "./atoms";
import Board from "./components/Board";
import { motion } from "framer-motion";

function App() {
  const [toDos, setToDos] = useRecoilState(toDostate);
  const [boards, setBoards] = useRecoilState(IBoardState);
  const setTrashCan = useSetRecoilState(TrashCanState);
  const onBeforeDragStart = (info: DragStart) => {
    if (info.type === "DEFAULT") setTrashCan(true);
  };
  const onDragEndUtills = (
    info: DropResult,
    setBoards: SetterOrUpdater<string[]>,
    setToDos: SetterOrUpdater<IToDoState>,
    setTrashCan: SetterOrUpdater<boolean>
  ) => {
    const { destination, source } = info;
    if (!destination) return;
    setTrashCan(false);
    if (source.droppableId === "boards") {
      setBoards((prev) => {
        const boardCopy = [...prev];
        const taskObj = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination.index, 0, taskObj);
        return boardCopy;
      });
    }
    //
    if (destination?.droppableId === source.droppableId) {
      // same board movements
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  // console.log(toDostate);
  return (
    <DragDropContext
      onDragEnd={(info) =>
        onDragEndUtills(info, setBoards, setToDos, setTrashCan)
      }
    >
      <Wrapper className="flex-col bg-[#0e7490] ">
        <div className="mb-0 flex h-44 w-full items-center justify-center">
          <span className="mb-20 text-4xl text-white">Kanban Board</span>
        </div>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards
              ref={magic.innerRef}
              {...magic.droppableProps}
              className="mb-28"
            >
              {Object.keys(toDos).map((boardId) => (
                <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
              ))}
            </Boards>
          )}
        </Droppable>
        <div className="flex h-1 w-full items-end justify-end">
          <motion.div
            className="mr-5"
            whileHover={{
              opacity: 1,
              scale: 1.2,
              boxShadow: "0px 0px 8px rgb(255,255,255) ",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-14 w-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </motion.div>
        </div>
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

export default App;
