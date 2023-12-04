import { useRecoilState } from "recoil";
import { inputModeAtom } from "../../../../states/todoItems";
import { InputMode, TodoItem } from "../../../../types";

const defaultInputMode: InputMode = { type: "default" };

// 여러 컴포넌트에서 사용하므로 recoil에 담아서 전역적으로 사용할 수 있도록 함.
// 또한, 설정하는 로직이 복잡하므로 커스텀 훅으로 한곳에서 관리하도록 함.
export default function useInputMode() {
  const [inputMode, setInputMode] = useRecoilState(inputModeAtom);

  function handleAddMode() {
    setInputMode({ type: "add" });
  }

  function handleEditMode(item: TodoItem) {
    setInputMode({ type: "edit", item });
    // setEditInputValue(item.content);
  }

  function handleResetInputMode() {
    setInputMode(defaultInputMode);
  }

  return {
    inputMode,
    onAddMode: handleAddMode,
    onEditMode: handleEditMode,
    onResetInputMode: handleResetInputMode,
  };
}
