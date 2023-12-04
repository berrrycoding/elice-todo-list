import { todoItemKeys } from "../constants/todoItemKeys";
import { TodoItem } from "../types";

export default async function cancelDoneTodoItem(id: TodoItem["id"]) {
  const todoItemsFromLocalStorage = JSON.parse(
    localStorage.getItem(todoItemKeys) ?? "[]"
  ) as TodoItem[];

  const index = todoItemsFromLocalStorage.findIndex((item) => item.id === id);

  if (index <= -1) {
    throw new Error("Internal Error");
  }

  todoItemsFromLocalStorage[index] = {
    ...todoItemsFromLocalStorage[index],
    isDone: false,
  };

  localStorage.setItem(todoItemKeys, JSON.stringify(todoItemsFromLocalStorage));

  return {
    data: {
      item: todoItemsFromLocalStorage[index],
    },
  };
}
