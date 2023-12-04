import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  fetchTodoItemsSelector,
  filteredTodoItemsSelector,
  todoItemsAtom,
} from "../../../../states/todoItems";

// 문제점: currentDate를 입력받아야한다.
// [해결]
// 1. useTodoItems에게 인자로 currentDate를 넘겨받도록 하기.
// 2. 전역에서 사용가능한 객체에 currentDate
//    전역객체? -> 다른 컴포넌트에서도 가져다가 쓸 수 있고 저장도 할 수 있도록 설계되어있는 객체.
// 3. url
//    http://localhost:5173/?currentDate=2023-11-23
export default function useTodoItems() {
  // 로컬 state <-> 전역 state (recoil)
  const setTodoItems = useSetRecoilState(todoItemsAtom);
  const filteredTodoItems = useRecoilValue(filteredTodoItemsSelector);
  const fetchTodoItems = useRecoilValue(fetchTodoItemsSelector);

  useEffect(() => {
    setTodoItems(fetchTodoItems);
  }, [fetchTodoItems, setTodoItems]);

  return {
    todoItems: filteredTodoItems,
  };
}
