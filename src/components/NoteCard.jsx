import React from "react";
import DeleteButton from "./DeleteButton";
import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../util";
import { db } from "../appwrite/databases";
import Spinner from "../Icons/Spinner";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false); //是否正在保存数据
  const keyUpTimer = useRef(null);

  const { setSelectedNote } = useContext(NoteContext);

  const body = bodyParser(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const cardRef = useRef(null);
  let mouseStartPos = { x: 0, y: 0 }; //鼠标的初始位置

  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current); //设置卡片的层级
  }, []);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY; //鼠标的初始位置

      //监听鼠标的移动与松开事件
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);

      setZIndex(cardRef.current); //设置卡片的层级
      setSelectedNote(note); //设置选中的笔记
    }
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

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition); //保存位置数据到数据库
  };

  //数据保存函数
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
  };

  const keyUpTimerHandler = async () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
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
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          onKeyUp={keyUpTimerHandler}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current); //设置卡片的层级
            setSelectedNote(note);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
