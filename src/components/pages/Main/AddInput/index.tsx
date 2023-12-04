import { useRecoilValue, useSetRecoilState } from "recoil";
import addTodoItem from "../../../../apis/addTodoItem";
import { currentDateAtom, todoItemsAtom } from "../../../../states/todoItems";
import TextInputForm from "../../../shared/TextInputForm";
import useInputMode from "../hooks/useInputMode";

// UI를 담당하는 로직(AddInput)과 비즈니스 로직(useAddInput)을 분리하는 것이 좋습니다.
export default function AddInput() {
  const { inputMode, onResetInputMode } = useInputMode();
  const { onAddTodoItem } = useAddTodoItem();

  return (
    <>
      {inputMode.type === "add" && (
        <TextInputForm
          onSave={async (input) => {
            await onAddTodoItem(input);
            onResetInputMode();
          }}
          onCancel={onResetInputMode}
        />
      )}
    </>
  );
}

function useAddTodoItem() {
  const currentDate = useRecoilValue(currentDateAtom);
  const setTodoItems = useSetRecoilState(todoItemsAtom);

  async function handleAddTodoItem(content: string) {
    const result = await addTodoItem({ content, date: currentDate });
    const newItem = result.data.item;

    setTodoItems((prev) => [...prev, newItem]);
  }

  return { onAddTodoItem: handleAddTodoItem };
}
