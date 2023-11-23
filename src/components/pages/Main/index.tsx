import addDays from "date-fns/addDays";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import { ChangeEvent, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { InputMode, TodoItem } from "../../../types";
import { Spacing } from "../../shared/Spacing";
import useTodoItems from "./hooks/useTodoItems";

const defaultInputMode: InputMode = { type: "default" };

// hook -> ui함수를 Return하지 않고, state와 관련한 로직을 실행하고 내보내는 곳.
// use+아무거나
// useCurrentDate

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
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <div onClick={handleMovePreviousDate} style={{ padding: 10 }}>
          <FiChevronLeft size={25} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>
            {format(currentDate, "MM월 dd일")}
          </div>
          <div style={{ color: "#BCBCBC" }}>
            {format(currentDate, "yyyy년")}
          </div>
        </div>
        <div onClick={handleMoveNextDate} style={{ padding: 10 }}>
          <FiChevronRight size={25} />
        </div>
      </div>
      <div
        style={{
          padding: 20,
          height: "100%",
          boxSizing: "border-box",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* AddInput */}
        {inputMode.type === "add" && (
          <div>
            <input
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px solid #666666",
                outline: "none",
                color: "#fff",
                padding: "6px 0",
                fontSize: "1em",
                width: "100%",
              }}
              type="text"
              placeholder="새로운 할일을 입력할 수 있어요 :)"
              value={addInputValue}
              onChange={handleChangeAddInputValue}
            />
            <Spacing size={5} />
            <div>
              <button
                onClick={handleResetInputMode}
                style={{
                  background: "none",
                  border: "1px solid #CFFF48",
                  borderRadius: 14,
                  color: "#CFFF48",
                  padding: "5px 10px",
                  marginRight: 4,
                  fontWeight: 700,
                }}
              >
                취소
              </button>
              <button
                onClick={onAddTodoItem}
                style={{
                  background: "#CFFF48",
                  padding: "5px 10px",
                  border: "1px solid transparent",
                  borderRadius: 14,
                  fontWeight: 700,
                }}
              >
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
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid #666666",
                      outline: "none",
                      color: "#fff",
                      padding: "6px 0",
                      fontSize: "1em",
                      width: "100%",
                    }}
                    type="text"
                    placeholder="새로운 할일을 입력할 수 있어요 :)"
                    value={editInputValue}
                    onChange={handleChangeEditInputValue}
                  />
                  <Spacing size={5} />
                  <div>
                    <button
                      onClick={handleResetInputMode}
                      style={{
                        background: "none",
                        border: "1px solid #CFFF48",
                        borderRadius: 14,
                        color: "#CFFF48",
                        padding: "5px 10px",
                        marginRight: 4,
                        fontWeight: 700,
                      }}
                    >
                      취소
                    </button>
                    <button
                      onClick={onEditTodoItem}
                      style={{
                        background: "#CFFF48",
                        padding: "5px 10px",
                        border: "1px solid transparent",
                        borderRadius: 14,
                        fontWeight: 700,
                      }}
                    >
                      저장
                    </button>
                  </div>
                </div>
              )}
              {!isEditMode && !item.isDone && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onClick={() => handleEditMode(item)}
                >
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      textDecoration: "line-through",
                      color: "#666666",
                    }}
                  >
                    {item.content}
                  </div>
                  <div onClick={() => onCancelDone(index)}>
                    <FiCheck color="#CFFF48" size={26} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        onClick={handleAddMode}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          width: 32,
          height: 32,
          borderRadius: 30,
          background: "#CFFF48",
          // text-align vs flex center
          // text-align: 인라인 요소, text를 정렬하는 속성
          // <div style={{ textAlign: 'center' }}> <div>텍스트</div> </div>
          // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div>텍스트</div> </div>
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FiPlus color="#1E1E1E" size={24} />
      </div>
    </div>
  );
}
