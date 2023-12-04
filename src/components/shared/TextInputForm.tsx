import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../theme/colors";
import { Spacing } from "./Spacing";
import { TextInput } from "./TextInput";

interface Props {
  defaultValue?: string;
  onSave: (value: string) => Promise<void>;
  onCancel: () => void;
}

export default function TextInputForm({
  defaultValue = "",
  onSave,
  onCancel,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    if (value.trim().length === 0) {
      return;
    }

    await onSave(value);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="새로운 할일을 입력할 수 있어요 :)"
        value={value}
        onChange={handleChange}
      />
      <Spacing size={5} />
      <div>
        <CancelButton type="button" disabled={isLoading} onClick={onCancel}>
          취소
        </CancelButton>
        <SaveButton type="submit" disabled={isLoading}>
          저장
        </SaveButton>
      </div>
    </form>
  );
}

const CancelButton = styled.button`
  background: none;
  border: 1px solid ${colors.primary};
  border-radius: 14px;
  color: ${colors.primary};
  padding: 5px 10px;
  margin-right: 4px;
  font-weight: 700;
`;

const SaveButton = styled.button`
  background: ${colors.primary};
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 5px 10px;
  font-weight: 700;
`;
