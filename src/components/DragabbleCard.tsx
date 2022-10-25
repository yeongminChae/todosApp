import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Trash from "./Trash";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05) " : "none"};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId?: string;
}

function DragableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) {
  return (
    <>
      <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
            className="flex w-full justify-between"
          >
            {toDoText}
            <div className="mr-1 flex cursor-pointer items-end justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default React.memo(DragableCard);
