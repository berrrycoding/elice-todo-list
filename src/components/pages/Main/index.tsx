import addDays from "date-fns/addDays";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import { ChangeEvent, useState } from "react";
import { FiCheck, FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { colors } from "../../../theme/colors";
import { InputMode, TodoItem } from "../../../types";
import { Spacing } from "../../shared/Spacing";
import useTodoItems from "./hooks/useTodoItems";

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
    <Container>
      <DateNavigator>
        <div onClick={handleMovePreviousDate} className="move-button">
          <FiChevronLeft size={25} />
        </div>
        <TextCenter>
          <div className="date-big-font">
            {format(currentDate, "MM월 dd일")}
          </div>
          <div className="date-normal-font">
            {format(currentDate, "yyyy년")}
          </div>
        </TextCenter>
        <div onClick={handleMoveNextDate} className="move-button">
          <FiChevronRight size={25} />
        </div>
      </DateNavigator>
      <TodoList>
        {/* AddInput */}
        {inputMode.type === "add" && (
          <div>
            <TextInput
              type="text"
              placeholder="새로운 할일을 입력할 수 있어요 :)"
              value={addInputValue}
              onChange={handleChangeAddInputValue}
            />
            <Spacing size={5} />
            <div>
              <CancelButton onClick={handleResetInputMode}>취소</CancelButton>
              <SaveButton onClick={onAddTodoItem}>저장</SaveButton>
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
                  <TextInput
                    type="text"
                    placeholder="새로운 할일을 입력할 수 있어요 :)"
                    value={editInputValue}
                    onChange={handleChangeEditInputValue}
                  />
                  <Spacing size={5} />
                  <div>
                    <CancelButton onClick={handleResetInputMode}>
                      취소
                    </CancelButton>
                    <SaveButton onClick={onEditTodoItem}>저장</SaveButton>
                  </div>
                </div>
              )}
              {!isEditMode && !item.isDone && (
                <div className="todo-item" onClick={() => handleEditMode(item)}>
                  <Content isDone={false}>{item.content}</Content>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDone(index);
                    }}
                  >
                    <FiCheck color={colors.gray[1]} size={26} />
                  </div>
                </div>
              )}
              {!isEditMode && item.isDone && (
                <div className="todo-item">
                  <Content isDone={true}>{item.content}</Content>
                  <div onClick={() => onCancelDone(index)}>
                    <FiCheck color={colors.primary} size={26} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </TodoList>
      <AddButton onClick={handleAddMode}>
        <FiPlus color={colors.dark} size={24} />
      </AddButton>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const DateNavigator = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .move-button {
    padding: 10px;
  }

  .date-big-font {
    font-size: 24px;
    font-weight: bold;
  }

  .date-normal-font {
    color: ${colors.gray[1]};
  }
`;

const TextCenter = styled.div`
  text-align: center;
`;

const TodoList = styled.div`
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .todo-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .done {
      text-decoration: line-through;
      color: ${colors.gray[1]};
    }
  }
`;

const Content = styled.div<{ isDone: boolean }>`
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
  color: ${(props) => (props.isDone ? colors.gray[1] : "inherit")};
`;

const TextInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.gray[1]};
  outline: none;
  color: ${colors.white};
  padding: 6px 0;
  font-size: 1em;
  width: 100%;
`;

const CancelButton = styled.button`
  background: none;
  border: 1px solid ${colors.primary};
  border-radius: 14px;
  color: ${colors.primary};
  padding: 5px 10px;
  margin-right: 4px;
  font-weight: 700;
`;

const SaveButton = styled.button`
  background: ${colors.primary};
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 5px 10px;
  font-weight: 700;
`;

const AddButton = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 32px;
  height: 32px;
  border-radius: 30px;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
