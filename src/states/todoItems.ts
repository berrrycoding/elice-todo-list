import { atom, selector } from "recoil";
import getTodoItems from "../apis/getTodoItems";
import { FilterType, InputMode, TodoItem } from "../types";
import { getFormattedDate } from "../utils/getFormattedDate";

export const todoItemsAtom = atom<TodoItem[]>({
  key: "todoItemsAtom",
  default: [],
});

// data fetching을 캐싱하기 위해서 selector를 사용합니다.
// useTodoItems 파일에서 useEffect로 불러와서 todoItemsAtom의 setter 함수를 통해서 저장하게 됩니다.
export const fetchTodoItemsSelector = selector({
  key: "fetchTodoItems",
  get: async ({ get }) => {
    const currentDate = get(currentDateAtom);
    const response = await getTodoItems(currentDate);
    return response.data.items;
  },
});

export const filteredTodoItemsSelector = selector({
  key: "filteredTodoItemsSelector",
  get: ({ get }) => {
    const todoItems = get(todoItemsAtom);
    const filter = get(filterAtom);
    const currentDate = get(currentDateAtom);

    const dateString = getFormattedDate(currentDate);

    const newTodoItem = todoItems.filter(
      (item) => item.createdAt === dateString
    );

    switch (filter) {
      case "all": {
        return newTodoItem;
      }
      case "done": {
        return newTodoItem.filter((item) => item.isDone);
      }
      case "not yet": {
        return newTodoItem.filter((item) => !item.isDone);
      }
    }
  },
});

// 1. atom의 파생된 상태 -> atom을 재구성할 수 있는 기능
// 다시 설정할 수 없는 값 -> Read Only
export const todoItemsProgressPercentageSelector = selector({
  key: "todoItemsProgressPercentageSelector",
  // get은 보통의 경우 캐싱(저장)되어서 재활용이 가능하지만,
  // 다시 실행되는 경우가 있다 ->
  get: ({ get }) => {
    const todoItems = get(filteredTodoItemsSelector);

    const 전체_항목 = todoItems.length;
    const 완료된_항목 = todoItems.filter((item) => item.isDone).length;
    const percentage =
      전체_항목 > 0 ? Math.round((완료된_항목 / 전체_항목) * 100) : 0;

    return percentage;
  },
});

export const filterAtom = atom<FilterType>({
  key: "filterAtom",
  default: "all",
});

export const currentDateAtom = atom({
  key: "currentDateAtom",
  default: new Date(),
});

export const inputModeAtom = atom<InputMode>({
  key: "inputModeAtom",
  default: { type: "default" },
});
