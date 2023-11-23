import format from "date-fns/format";
import { ChangeEvent, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import todoItemsDummy from "./assets/dummy/todoItems";
import { Spacing } from "./components/shared/Spacing";
import { InputMode, TodoItem } from "./types";

const defaultInputMode: InputMode = { type: "default" };

function App() {
  // ctrl + . , mac: cmd + .
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todoItems, setTodoItems] = useState<TodoItem[]>(
    todoItemsDummy as TodoItem[]
  );

  const [inputMode, setInputMode] = useState<InputMode>(defaultInputMode);
  const [addInputValue, setAddInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");

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

  function handleAddTodoItem() {
    // TODO: add 관련 LocalStorage 로직

    // TODO: add state 관련 로직

    handleResetInputMode();
  }

  function handleChangeAddInputValue(event: ChangeEvent<HTMLInputElement>) {
    setAddInputValue(event.target.value);
  }

  function handleChangeEditInputValue(event: ChangeEvent<HTMLInputElement>) {
    setEditInputValue(event.target.value);
  }

  // 1. index를 input으로 가져오는 경우
  function handleDone(index: number) {
    const newTodoItems = [...todoItems];
    newTodoItems[index].isDone = true;

    setTodoItems(newTodoItems);
  }

  // 2. item을 input으로 가져오는 경우
  // function handleDone(item: TodoItem) {
  //   // 1. todoItems에서 findIndex를 통해서 index 찾기
  //   // 2. todoItems를 map함수를 사용해서 item.id가 같은 것은 isDone=true로 하고 나머지는 그냥 두기
  //       -> for문이 동작하므로 1번 방법인 index를 가져와서 배열을 조작하는 것보다 연산횟수가 훨씬 더 많음.
  //   setTodoItems(값);
  //   setTodoItems((previousState) =>
  //     previousState.map((_item) => {
  //       if (_item.id === item.id) {
  //         return {
  //           ..._item,
  //           isDone: true,
  //         };
  //       } else {
  //         return _item;
  //       }
  //     })
  //   );
  // }

  function handleCancelDone(index: number) {
    const newTodoItems = [...todoItems];
    newTodoItems[index].isDone = false;

    setTodoItems(newTodoItems);
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
        <div style={{ padding: 10 }}>
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
        <div style={{ padding: 10 }}>
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
                onClick={handleAddTodoItem}
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
                      onClick={handleAddTodoItem}
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
                      handleDone(index);
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
                  <div onClick={() => handleCancelDone(index)}>
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

export default App;
