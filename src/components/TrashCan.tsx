import { motion } from "framer-motion";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { TrashCanState } from "../atoms";

function TrashCan() {
  const trashCan = useRecoilValue(TrashCanState);
  return (
    <Droppable droppableId="trashcan">
      {(magic) => (
        <TrashCanDiv
          ref={magic.innerRef}
          {...magic.droppableProps}
          className="mb-10 mr-20 flex h-10 w-full items-center justify-center"
        >
          {trashCan && (
            <div className="mt-20">
              <motion.span
                className="trash"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <span></span>
                <i></i>
              </motion.span>
            </div>
          )}
          {/* {magic.placeholder} */}
        </TrashCanDiv>
      )}
    </Droppable>
  );
}

const rowVariants = {
  hidden: { x: window.outerWidth - 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5, opacity: 0 },
};

const TrashCanDiv = styled(motion.div)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 33px;
  height: 40px;

  .trash {
    background: #ff6873;
    width: 56px;
    height: 60px;
    display: inline-block;
    margin: 0 auto;

    svg {
      position: absolute;
      top: 13px;
      right: 8px;
      color: ${(props) => props.theme.boardColor};
    }

    position: relative;
    -webkit-border-bottom-right-radius: 6px;
    -webkit-border-bottom-left-radius: 6px;
    -moz-border-radius-bottomright: 6px;
    -moz-border-radius-bottomleft: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .trash span {
    position: absolute;
    height: 12px;
    background: #ff6873;
    top: -19px;
    left: -10px;
    right: -10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 1000ms;
    transform-origin: 82% 100%;
    display: flex;
    justify-content: center;
  }
  .trash span:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 7px;
    background: #ff6873;
    top: -10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 500ms;
    transform-origin: 82% 100%;
    left: 27px;
  }

  .trash i {
    position: relative;
    width: 5px;
    height: 30px;
    background: #fff;
    display: block;
    margin: 14px auto;
    border-radius: 5px;
  }
  .trash i:after {
    content: "";
    width: 5px;
    height: 30px;
    background: #fff;
    position: absolute;
    left: -18px;
    border-radius: 5px;
  }
  .trash i:before {
    content: "";
    width: 5px;
    height: 30px;
    background: #fff;
    position: absolute;
    right: -18px;
    border-radius: 5px;
  }

  &:hover .trash span {
    transform: rotate(45deg);
    transition: transform 250ms;
  }
`;

export default React.memo(TrashCan);
