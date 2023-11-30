import { ChangeEvent, useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { colors } from "../../../theme/colors";
import { Spacing } from "../../shared/Spacing";
import DateNavigator from "./DateNavigator";
import ProgressPercentage from "./ProgressPercentage";
import SelectFilter from "./SelectFilter";
import useInputMode from "./hooks/useInputMode";
import useTodoItems from "./hooks/useTodoItems";

export default function Main() {
  const { todoItems, onAddTodoItem, onEditTodoItem, onDone, onCancelDone } =
    useTodoItems();
  const { inputMode, onAddMode, onEditMode, onResetInputMode } = useInputMode();

  const [addInputValue, setAddInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");

  function handleChangeAddInputValue(event: ChangeEvent<HTMLInputElement>) {
    setAddInputValue(event.target.value);
  }

  function handleChangeEditInputValue(event: ChangeEvent<HTMLInputElement>) {
    setEditInputValue(event.target.value);
  }

  return (
    <Container>
      <DateNavigator />
      <SpaceBetween>
        <ProgressPercentage />
        <SelectFilter />
      </SpaceBetween>
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
              <CancelButton onClick={onResetInputMode}>취소</CancelButton>
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
                    <CancelButton onClick={onResetInputMode}>취소</CancelButton>
                    <SaveButton onClick={onEditTodoItem}>저장</SaveButton>
                  </div>
                </div>
              )}
              {!isEditMode && !item.isDone && (
                <div className="todo-item" onClick={() => onEditMode(item)}>
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
      <AddButton onClick={onAddMode}>
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

const SpaceBetween = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
