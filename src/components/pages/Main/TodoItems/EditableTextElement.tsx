import { ReactNode } from "react";
import { TodoItem as TodoItemType } from "../../../../types";
import EditInput from "./EditInput";

interface Props {
  item: TodoItemType;
  isEditMode: boolean;
  textElement?: ReactNode;
  onEditMode: (item: TodoItemType) => void;
}

export default function EditableTextElement({
  item,
  isEditMode,
  textElement,
}: Props) {
  return (
    <>
      {isEditMode && <EditInput item={item} />}
      {!isEditMode && textElement}
    </>
  );
}
