import styled from "styled-components";
import { colors } from "../../../../theme/colors";
import { TodoItem as TodoItemType } from "../../../../types";
import ItemStatusButton from "./ItemStatusButton";

interface Props extends TodoItemType {
  onEditMode: (item: TodoItemType) => void;
}

export default function TodoItem({ onEditMode, ...item }: Props) {
  const { isDone } = item;

  return (
    <>
      <Item onClick={() => !isDone && onEditMode(item)}>
        <Content status={item.isDone ? "done" : "not yet"}>
          {item.content}
        </Content>
        <ItemStatusButton item={item} />
      </Item>
    </>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div<{ status: "done" | "not yet" }>`
  text-decoration: ${(props) =>
    props.status === "done" ? "line-through" : "none"};
  color: ${(props) => (props.status === "done" ? colors.gray[1] : "inherit")};
`;
