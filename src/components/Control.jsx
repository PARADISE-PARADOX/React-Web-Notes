import React from "react";
import AddButton from "./AddButton";
import Color from "./Color";
import colors from "../assets/colors.json";

const Control = () => {
  return (
    <div id="controls">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </div>
  );
};

export default Control;
