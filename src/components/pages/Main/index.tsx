import addDays from "date-fns/addDays";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import { ChangeEvent, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { InputMode, TodoItem } from "../../../types";
import { Spacing } from "../../shared/Spacing";
import useTodoItems from "./hooks/useTodoItems";
import "./index.scss";

const defaultInputMode: InputMode = { type: "default" };

export default function Main() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { todoItems, onAddTodoItem, onEditTodoItem, onDone, onCancelDone } =
    useTodoItems(currentDate);

  const [addInputValue, setAddInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);

  function handleAddMode() {
    setInputMode({ type: "add" });
  }

  function handleEditMode(item: TodoItem) {
    setInputMode({ type: "edit", item });
    setEditInputValue(item.content);
  }

  function handleResetInputMode() {
    setInputMode(defaultInputMode);
  }

  function handleChangeAddInputValue(event: ChangeEvent<HTMLInputElement>) {
    setAddInputValue(event.target.value);
  }

  function handleChangeEditInputValue(event: ChangeEvent<HTMLInputElement>) {
    setEditInputValue(event.target.value);
  }

  function handleMoveNextDate() {
    // 현재 날짜보다 하루 뒤. +1 -> 그걸 setCurrentDate에 적용해주기
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
  }

  function handleMovePreviousDate() {
    const newDate = subDays(currentDate, 1);
    setCurrentDate(newDate);
  }

  return (
    <div className="container">
      <div className="date-navigator">
        <div onClick={handleMovePreviousDate} className="move-button">
          <FiChevronLeft size={25} />
        </div>
        <div className="text-center">
          <div className="date-big-font">
            {format(currentDate, "MM월 dd일")}
          </div>
          <div className="date-normal-font">
            {format(currentDate, "yyyy년")}
          </div>
        </div>
        <div onClick={handleMoveNextDate} className="move-button">
          <FiChevronRight size={25} />
        </div>
      </div>
      <div className="todo-list">
        {/* AddInput */}
        {inputMode.type === "add" && (
          <div>
            <input
              type="text"
              placeholder="새로운 할일을 입력할 수 있어요 :)"
              value={addInputValue}
              onChange={handleChangeAddInputValue}
            />
            <Spacing size={5} />
            <div>
              <button onClick={handleResetInputMode} className="cancel-button">
                취소
              </button>
              <button onClick={onAddTodoItem} className="save-button">
                저장
              </button>
            </div>
          </div>
        )}
        {todoItems.map((item, index) => {
          const isEditMode =
            inputMode.type === "edit" && inputMode.item === item;

          return (
            <div key={item.id}>
              {/* EditInput */}
              {isEditMode && (
                <div>
                  <input
                    type="text"
                    placeholder="새로운 할일을 입력할 수 있어요 :)"
                    value={editInputValue}
                    onChange={handleChangeEditInputValue}
                  />
                  <Spacing size={5} />
                  <div>
                    <button
                      onClick={handleResetInputMode}
                      className="cancel-button"
                    >
                      취소
                    </button>
                    <button onClick={onEditTodoItem} className="save-button">
                      저장
                    </button>
                  </div>
                </div>
              )}
              {!isEditMode && !item.isDone && (
                <div className="todo-item" onClick={() => handleEditMode(item)}>
                  <div>{item.content}</div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDone(index);
                    }}
                  >
                    <FiCheck color="#666666" size={26} />
                  </div>
                </div>
              )}
              {!isEditMode && item.isDone && (
                <div className="todo-item">
                  <div className="done">{item.content}</div>
                  <div onClick={() => onCancelDone(index)}>
                    <FiCheck color="#CFFF48" size={26} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div onClick={handleAddMode} className="add-button">
        <FiPlus color="#1E1E1E" size={24} />
      </div>
    </div>
  );
}
