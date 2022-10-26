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
          className="flex h-10 w-full items-end justify-center"
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
        </TrashCanDiv>
      )}
    </Droppable>
  );
}

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -window.outerWidth - 5, opacity: 0 },
};

const TrashCanDiv = styled(motion.div)`
  body,
  html {
    margin: 0px;
    margin-top: 10px;
    padding: 0px;
    padding-top: 10px;
    font-family: "Titillium Web", sans-serif;
    font-size: 23px;
    line-height: 42px;
    font-weight: 100;
    text-align: center;
    height: 100%;
    top: 5px;
  }
  section {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .trash {
    background: #ff6873;
    width: 56px;
    height: 60px;
    display: inline-block;
    margin: 0 auto;

    position: relative;
    -webkit-border-bottom-right-radius: 6px;
    -webkit-border-bottom-left-radius: 6px;
    -moz-border-radius-bottomright: 6px;
    -moz-border-radius-bottomleft: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .trash:after {
    position: absolute;
    left: -99px;
    right: 0;
    bottom: -25px;
    width: 300px;
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
    transform-origin: 19% 100%;
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
    transform-origin: 19% 100%;
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

  .trash:hover span {
    transform: rotate(-45deg);
    transition: transform 250ms;
  }
`;

export default React.memo(TrashCan);
