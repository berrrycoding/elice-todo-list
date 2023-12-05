import styled, { CSSProperties } from "styled-components";

// 아이템들을 일렬로 쌓아두는데, 그 간격을 둬야할 때 유용하게 사용할 수 있는 컴포넌트.
export const Stack = styled.div<{
  spacing?: number;
  direction?: CSSProperties["flexDirection"];
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ spacing }) => spacing}px;
`;
