import { v4 as uuidv4 } from "uuid";
import { todoItemKeys } from "../constants/todoItemKeys";
import { getFormattedDate } from "../utils/getFormattedDate";

export default async function addTodoItem({
  content,
  date,
}: {
  content: string;
  date: Date;
}) {
  const newTodoItem = {
    id: uuidv4(),
    content,
    isDone: false,
    createdAt: getFormattedDate(date),
  };

  const todoItemsFromLocalStorage = JSON.parse(
    localStorage.getItem(todoItemKeys) ?? "[]"
  );

  const newTodoItems = [...todoItemsFromLocalStorage, newTodoItem];
  localStorage.setItem(todoItemKeys, JSON.stringify(newTodoItems));

  return {
    data: {
      item: newTodoItem,
    },
  };
}
