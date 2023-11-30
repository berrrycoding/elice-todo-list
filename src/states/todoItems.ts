import { atom, selector } from "recoil";
import { TodoItem } from "../types";

export const todoItemsAtom = atom<TodoItem[]>({
  key: "todoItemsAtom",
  default: [],
});

// 1. atom의 파생된 상태 -> atom을 재구성할 수 있는 기능
// 다시 설정할 수 없는 값 -> Read Only
export const todoItemsProgressPercentageSelector = selector({
  key: "todoItemsProgressPercentageSelector",
  // get은 보통의 경우 캐싱(저장)되어서 재활용이 가능하지만,
  // 다시 실행되는 경우가 있다 ->
  get: ({ get }) => {
    const todoItems = get(todoItemsAtom);

    const 전체_항목 = todoItems.length;
    const 완료된_항목 = todoItems.filter((item) => item.isDone).length;
    const percentage =
      전체_항목 > 0 ? Math.round((완료된_항목 / 전체_항목) * 100) : 0;

    return percentage;
  },
});

// const todoItemsProgressPercentage = useRecoilValue(todoItemsProgressPercentageSelector)
