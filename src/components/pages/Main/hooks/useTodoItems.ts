import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  fetchTodoItemsSelector,
  filteredTodoItemsSelector,
  todoItemsAtom,
} from "../../../../states/todoItems";

export default function useTodoItems() {
  const setTodoItems = useSetRecoilState(todoItemsAtom);
  const filteredTodoItems = useRecoilValue(filteredTodoItemsSelector);
  // selector를 통해서 api 호출 결과물을 캐싱(저장)함.
  const fetchTodoItems = useRecoilValue(fetchTodoItemsSelector);

  // 그리고 그 결과물을 아래처럼 useEffect에서 담아준다.
  useEffect(() => {
    setTodoItems(fetchTodoItems);
  }, [fetchTodoItems, setTodoItems]);

  return {
    todoItems: filteredTodoItems,
  };
}
