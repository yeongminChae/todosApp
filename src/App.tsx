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
import TrashCan from "./components/TrashCan";

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
    if (destination.droppableId === "trashcan") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
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
  return (
    <DragDropContext
      onDragEnd={(info) =>
        onDragEndUtills(info, setBoards, setToDos, setTrashCan)
      }
      onBeforeDragStart={onBeforeDragStart}
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
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  index={index}
                  toDos={toDos[boardId]}
                />
              ))}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
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
