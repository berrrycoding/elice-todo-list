import styled from "styled-components";
import { colors } from "../../theme/colors";

export const TextInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.gray[1]};
  outline: none;
  color: ${colors.white};
  padding: 6px 0;
  font-size: 1em;
  width: 100%;
`;
