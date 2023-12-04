import { todoItemKeys } from "../constants/todoItemKeys";
import { TodoItem } from "../types";
import { getFormattedDate } from "../utils/getFormattedDate";

export default async function getTodoItems(currentDate: Date) {
  const todoItemsFromLocalStorage = JSON.parse(
    localStorage.getItem(todoItemKeys) ?? "[]"
  ) as TodoItem[];

  const formattedCurrentDate = getFormattedDate(currentDate);

  const filteredTodoItems = todoItemsFromLocalStorage.filter(
    (item) => item.createdAt === formattedCurrentDate
  );

  return new Promise<{ data: { items: TodoItem[] } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { items: filteredTodoItems } });
    }, 1000);
  });
}
