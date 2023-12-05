import { todoItemKeys } from "../constants/todoItemKeys";
import { TodoItem } from "../types";
import { getFormattedDate } from "../utils/getFormattedDate";

// 1000ms(milliseconds, 밀리세컨즈) = 1s(second, 초)
// setTimeout에서는 ms 단위로 사용합니다.
// 그렇지만 우리는 초 단위가 더 익숙하니 아래처럼 상수로 따로 빼줘서 가독성을 높혔습니다.
const second = 1000;

export default async function getTodoItems(currentDate: Date) {
  const todoItemsFromLocalStorage = JSON.parse(
    localStorage.getItem(todoItemKeys) ?? "[]"
  ) as TodoItem[];

  const formattedCurrentDate = getFormattedDate(currentDate);

  const filteredTodoItems = todoItemsFromLocalStorage.filter(
    (item) => item.createdAt === formattedCurrentDate
  );

  // Loading 처리나 Suspense를 보기 위해서 setTimeout을 통해서 delay 시켰지만 꼭 사용하지 않으셔도 됩니다!
  // 만약 지우게 된다면 아래처럼 적어주면 되겠죵?
  // return { data: { items: filteredTodoItems } }
  return new Promise<{ data: { items: TodoItem[] } }>((resolve) => {
    setTimeout(() => {
      resolve({ data: { items: filteredTodoItems } });
    }, 2 * second);
  });
}
