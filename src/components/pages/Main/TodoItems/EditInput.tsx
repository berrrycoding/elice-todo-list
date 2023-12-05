import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import updateItem from "../../../../apis/updateItem";
import { todoItemsAtom } from "../../../../states/todoItems";
import { TodoItem } from "../../../../types";
import TextInputForm from "../../../shared/TextInputForm";
import useInputMode from "../hooks/useInputMode";

interface Props {
  item: TodoItem;
}

export default function EditInput({ item }: Props) {
  const { mutateAsync: onEditTodoItem } = useEditTodoItem();

  const { onResetInputMode } = useInputMode();

  return (
    <TextInputForm
      defaultValue={item.content}
      onSave={async (input) => {
        await onEditTodoItem({ ...item, content: input });
        onResetInputMode();
      }}
      onCancel={onResetInputMode}
    />
  );
}

function useEditTodoItem() {
  const setTodoItems = useSetRecoilState(todoItemsAtom);

  return useMutation({
    mutationFn: async function handleEditTodoItem(item: TodoItem) {
      const result = await updateItem(item);
      const updatedItem = result.data.item;

      setTodoItems((prev) => {
        const newTodoItems = [...prev];
        const index = newTodoItems.findIndex(
          (item) => item.id === updatedItem.id
        );
        newTodoItems[index] = updatedItem;
        return newTodoItems;
      });
    },
  });
}
