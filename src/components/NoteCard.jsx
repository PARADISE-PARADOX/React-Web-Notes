import React from "react";
import Trash from "../Icons/Trash";
import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { setNewOffset, autoGrow, setZIndex } from "../util";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const cardRef = useRef(null);
  let mouseStartPos = { x: 0, y: 0 }; //鼠标的初始位置

  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY; //鼠标的初始位置

    //监听鼠标的移动与松开事件
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZIndex(cardRef.current); //设置卡片的层级
  };

  //鼠标的移动函数
  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    console.log(mouseMoveDir);

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY; //更新鼠标的初始位置

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

    setPosition(newPosition);
  };

  //鼠标的松开函数
  const mouseUp = (e) => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current); //设置卡片的层级
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
