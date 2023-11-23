import format from "date-fns/format";
import { useEffect, useState } from "react";
import todoItemsDummy from "../../../../assets/dummy/todoItems";
import { TodoItem } from "../../../../types";

// 문제점: currentDate를 입력받아야한다.
// [해결]
// 1. useTodoItems에게 인자로 currentDate를 넘겨받도록 하기.
// 2. 전역에서 사용가능한 객체에 currentDate
//    전역객체? -> 다른 컴포넌트에서도 가져다가 쓸 수 있고 저장도 할 수 있도록 설계되어있는 객체.
// 3. url
//    http://localhost:5173/?currentDate=2023-11-23
export default function useTodoItems(currentDate: Date) {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  function handleAddTodoItem() {
    // TODO: add 관련 LocalStorage 로직
    // TODO: add state 관련 로직
  }

  function handleEditTodoItem() {
    // TODO: edit 관련 LocalStorage 로직
    // TODO: edit state 관련 로직
  }

  function handleDone(index: number) {
    const newTodoItems = [...todoItems];
    newTodoItems[index].isDone = true;

    setTodoItems(newTodoItems);
  }

  function handleCancelDone(index: number) {
    const newTodoItems = [...todoItems];
    newTodoItems[index].isDone = false;

    setTodoItems(newTodoItems);
  }

  useEffect(() => {
    // 현재 currentDate는 Date 타입이다.
    // string 타입인 "yyyy-MM-dd"
    const dateString = format(currentDate, "yyyy-MM-dd");

    const newTodoItem = todoItemsDummy.filter(
      (item) => item.createdAt === dateString
    );
    setTodoItems(newTodoItem);
  }, [currentDate]);

  return {
    todoItems,
    onAddTodoItem: handleAddTodoItem,
    onEditTodoItem: handleEditTodoItem,
    onDone: handleDone,
    onCancelDone: handleCancelDone,
  };
}
