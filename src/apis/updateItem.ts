import { todoItemKeys } from "../constants/todoItemKeys";
import { TodoItem } from "../types";

export default async function updateItem(item: TodoItem) {
  const todoItemsFromLocalStorage = JSON.parse(
    localStorage.getItem(todoItemKeys) ?? "[]"
  ) as TodoItem[];

  const index = todoItemsFromLocalStorage.findIndex((i) => i.id === item.id);
  todoItemsFromLocalStorage[index] = item;

  localStorage.setItem(todoItemKeys, JSON.stringify(todoItemsFromLocalStorage));

  return {
    data: {
      item,
    },
  };
}
