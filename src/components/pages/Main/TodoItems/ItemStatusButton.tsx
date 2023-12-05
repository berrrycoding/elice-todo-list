import { useMutation } from "@tanstack/react-query";
import { FiCheck } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import cancelDoneTodoItem from "../../../../apis/cancelDoneTodoItem";
import doneTodoItem from "../../../../apis/doneTodoItem";
import { todoItemsAtom } from "../../../../states/todoItems";
import { colors } from "../../../../theme/colors";
import { TodoItem } from "../../../../types";

interface Props {
  item: TodoItem;
}

export default function ItemStatusButton({ item }: Props) {
  const { id, isDone } = item;
  const { isPending: isLoadingDoneTodoItem, mutateAsync: onDoneTodoItem } =
    useDoneTodoItem();
  const {
    isPending: isLoadingCancelDoneTodoItem,
    mutateAsync: onCancelDoneTodoItem,
  } = useCancelDoneTodoItem();

  return (
    <>
      {!item.isDone && (
        <div
          onClick={(e) => {
            // 로딩 시에는 클릭 이벤트를 막습니다.
            // 아직 완료처리도 안되었는데, 버튼을 반복적으로 의도적으로 누르는 수가 있음.
            // 한번 api 요청을 했는데 계속 버튼을 누르는 경우를 막기 위함입니다.
            // 아직 로딩인 경우 api 호출이 발생하지 않도록 막아놓음.
            if (isLoadingDoneTodoItem) {
              return;
            }

            e.stopPropagation();
            onDoneTodoItem(id);
          }}
        >
          <FiCheck color={colors.gray[1]} size={26} />
        </div>
      )}
      {isDone && (
        <div
          onClick={() =>
            !isLoadingCancelDoneTodoItem && onCancelDoneTodoItem(id)
          }
        >
          <FiCheck color={colors.primary} size={26} />
        </div>
      )}
    </>
  );
}

function useDoneTodoItem() {
  const setTodoItems = useSetRecoilState(todoItemsAtom);

  return useMutation({
    mutationFn: async function handleDone(id: string) {
      await doneTodoItem(id);

      setTodoItems((prev) => {
        const index = prev.findIndex((item) => item.id === id);
        return [
          ...prev.slice(0, index),
          { ...prev[index], isDone: true },
          ...prev.slice(index + 1),
        ];
      });
    },
  });
}

function useCancelDoneTodoItem() {
  const setTodoItems = useSetRecoilState(todoItemsAtom);

  return useMutation({
    mutationFn: async function handleCancelDone(id: string) {
      await cancelDoneTodoItem(id);

      setTodoItems((prev) => {
        const index = prev.findIndex((item) => item.id === id);
        return [
          ...prev.slice(0, index),
          { ...prev[index], isDone: false },
          ...prev.slice(index + 1),
        ];
      });
    },
  });
}
