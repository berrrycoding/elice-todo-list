import useInputMode from "../hooks/useInputMode";
import useTodoItems from "../hooks/useTodoItems";
import EditableTextElement from "./EditableTextElement";
import TodoItem from "./TodoItem";

export default function TodoItems() {
  const { todoItems } = useTodoItems();
  const { inputMode, onEditMode } = useInputMode();

  return (
    <>
      {todoItems.map((item) => {
        const isEditMode = inputMode.type === "edit" && inputMode.item === item;

        return (
          <EditableTextElement
            key={item.id}
            item={item}
            isEditMode={isEditMode}
            textElement={
              <TodoItem {...item} onEditMode={() => onEditMode(item)} />
            }
          />
        );
      })}
    </>
  );
}
