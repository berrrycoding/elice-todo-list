import { useSuspenseQuery } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import getTodoItems from "../../../../apis/getTodoItems";
import {
  currentDateAtom,
  filteredTodoItemsSelector,
  todoItemsAtom,
} from "../../../../states/todoItems";

export default function useTodoItems() {
  const currentDate = useRecoilValue(currentDateAtom);
  const setTodoItems = useSetRecoilState(todoItemsAtom);
  const filteredTodoItems = useRecoilValue(filteredTodoItemsSelector);

  // 밖에서 Suspense로 감싸줬었기 때문에 useSuspenseQuery를 사용했습니다.
  // 만약 Suspense를 사용하고 싶지 않다면 useQuery로 바꾸셔도 좋습니다 :)

  // ++) queryFn 내부가 잘 캐싱되는지 console.log를 추가해서 확인해보세요!
  const queryResult = useSuspenseQuery({
    // queryKey 값을 기준으로 캐싱(저장)됩니다.
    // 만약 이 캐싱을 무효화해서 다시 불러오고 싶다면, 아래를 참고해서 해보세요!
    // -> 물론 useQuery의 queryFn에서 자기 자신의 key 값을 무효화하는 것만 피하신다면 좋을 것 같네요
    // https://tanstack.com/query/v4/docs/react/guides/query-invalidation
    queryKey: ["todos", currentDate],
    queryFn: async () => {
      const result = await getTodoItems(currentDate);
      // useQuery에서 반환하는 data를 그대로 사용해도 되지만,
      // filter에 따라서 필터링되는 로직이 있으므로 아래처럼 setTodoItems를 통해서 atom에 담아줬습니다.
      // 만약 recoil을 사용하고 싶지 않다면, 여기에서 useQuery를 통해서 반환한 data를 직접 필터링해줘서 useMemo에 담아준다던지 방법이 있겠죠?
      setTodoItems(result.data.items);
      return result;
    },
  });

  return {
    todoItems: filteredTodoItems,
    ...queryResult,
  };
}
