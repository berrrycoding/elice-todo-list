import styled, { CSSProperties } from "styled-components";

export const Stack = styled.div<{
  spacing?: number;
  direction?: CSSProperties["flexDirection"];
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ spacing }) => spacing}px;
`;
