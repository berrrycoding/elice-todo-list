import { todoItemKeys } from "../constants/todoItemKeys";
import { TodoItem } from "../types";

// id: string -> id: TodoItem["id"] 이렇게 한 이유
// 타입은 한 곳에서 관리해야, 이후에 타입이 변경되더라도 여러곳을 고치는게 아닌 한 곳만 고치면 되니 이렇게 했음
export default async function deleteTodoItem(id: TodoItem["id"]) {
  const todoItemsFromLocalStorage = JSON.parse(
    localStorage.getItem(todoItemKeys) ?? "[]"
  ) as TodoItem[];

  const newTodoItems = todoItemsFromLocalStorage.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(todoItemKeys, JSON.stringify(newTodoItems));

  return {
    data: {
      id,
    },
  };
}
