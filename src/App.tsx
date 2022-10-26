import { motion } from "framer-motion";
import { DragDropContext, DragStart, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IBoardState, toDostate, TrashCanState } from "./atoms";
import Board from "./components/Board";
import TrashCan from "./components/TrashCan";
import { onDragEndUtills } from "./utils";

function App() {
  const [toDos, setToDos] = useRecoilState(toDostate);
  const [boards, setBoards] = useRecoilState(IBoardState);
  const setTrashCan = useSetRecoilState(TrashCanState);
  const onBeforeDragStart = (info: DragStart) => {
    if (info.type === "DEFAULT") setTrashCan(true);
  };
  return (
    <DragDropContext
      onDragEnd={(info) =>
        onDragEndUtills(info, setBoards, setToDos, setTrashCan)
      }
      onBeforeDragStart={onBeforeDragStart}
    >
      <Wrapper className="relative flex flex-col overflow-hidden bg-[#0e7490]">
        <div className="mb-0 flex h-44 items-center justify-around ">
          <span className="mb-20 text-4xl text-white">Kanban Board</span>
        </div>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards
              ref={magic.innerRef}
              {...magic.droppableProps}
              className="mb-28 flex w-full items-center justify-center gap-5"
            >
              {boards.map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={index}
                  index={index}
                  toDos={toDos[boardId]}
                />
              ))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled(motion.div)`
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled(motion.div)``;

export default App;
