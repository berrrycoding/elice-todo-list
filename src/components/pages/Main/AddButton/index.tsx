import { FiPlus } from "react-icons/fi";
import styled from "styled-components";
import { colors } from "../../../../theme/colors";
import useInputMode from "../hooks/useInputMode";

export default function AddButton() {
  const { onAddMode } = useInputMode();

  return (
    <StyledButton onClick={onAddMode}>
      <FiPlus color={colors.dark} size={24} />
    </StyledButton>
  );
}

const StyledButton = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 32px;
  height: 32px;
  border-radius: 30px;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
