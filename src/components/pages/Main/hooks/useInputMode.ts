import { useState } from "react";
import { InputMode, TodoItem } from "../../../../types";

const defaultInputMode: InputMode = { type: "default" };

export default function useInputMode() {
  const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);

  function handleAddMode() {
    setInputMode({ type: "add" });
  }

  function handleEditMode(item: TodoItem) {
    setInputMode({ type: "edit", item });
    // setEditInputValue(item.content);
  }

  function handleResetInputMode() {
    setInputMode(defaultInputMode);
  }

  return {
    inputMode,
    onAddMode: handleAddMode,
    onEditMode: handleEditMode,
    onResetInputMode: handleResetInputMode,
  };
}
