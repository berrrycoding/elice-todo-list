import { todoItemKeys } from "../constants/todoItemKeys";
import { TodoItem } from "../types";

export default async function deleteTodoItem(id: string) {
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
