import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { TrashCanState } from "../atoms";

function TrashCan() {
  const trashCan = useRecoilValue(TrashCanState);
  return (
    <Droppable droppableId="trashcan">
      {(magic) => (
        <div ref={magic.innerRef} {...magic.droppableProps}>
          {trashCan && (
            <div className="mr-1 flex cursor-pointer items-end justify-end">
              <span></span>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}

export default React.memo(TrashCan);
