import { useState } from "react";
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
  const { isLoading: isLoadingDoneTodoItem, onDoneTodoItem } =
    useDoneTodoItem();
  const { isLoading: isLoadingCancelDoneTodoItem, onCancelDoneTodoItem } =
    useCancelDoneTodoItem();

  return (
    <>
      {!item.isDone && (
        <div
          onClick={(e) => {
            // 로딩 시에는 클릭 이벤트를 막습니다.
            // 한번 api 요청을 했는데 계속 버튼을 누르는 경우를 막기 위함입니다.
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

  const [isLoading, setIsLoading] = useState(false);

  async function handleDone(id: string) {
    setIsLoading(true);
    await doneTodoItem(id);

    setTodoItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      return [
        ...prev.slice(0, index),
        { ...prev[index], isDone: true },
        ...prev.slice(index + 1),
      ];
    });
    setIsLoading(false);
  }

  return { isLoading, onDoneTodoItem: handleDone };
}

function useCancelDoneTodoItem() {
  const setTodoItems = useSetRecoilState(todoItemsAtom);

  const [isLoading, setIsLoading] = useState(false);

  async function handleCancelDone(id: string) {
    setIsLoading(true);

    await cancelDoneTodoItem(id);

    setTodoItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      return [
        ...prev.slice(0, index),
        { ...prev[index], isDone: false },
        ...prev.slice(index + 1),
      ];
    });
    setIsLoading(false);
  }

  return { isLoading, onCancelDoneTodoItem: handleCancelDone };
}
