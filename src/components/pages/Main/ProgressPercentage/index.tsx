import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoItemsProgressPercentageSelector } from "../../../../states/todoItems";
import { colors } from "../../../../theme/colors";

// 반복적으로 계산해야 하는 경우 -> 최적화 방법
// 1. percentage를 State로 선언하고, useEffect안에서 계산해준다.
// 2. useMemo(값을 저장했다가 필요할 때 계산 없이 바로 꺼내서 사용할 수 있는, 메모이제이션 방식으로 적용한 것)
//    useCallback(함수를 저장했다가 이후에 재활용할 수 있도록 하는 훅)
// 3. selector

export default function ProgressPercentage() {
  const progressPercentage = useRecoilValue(
    todoItemsProgressPercentageSelector
  );

  return <StyledText>⛳️ 달성률 {progressPercentage}%</StyledText>;
}

const StyledText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
`;
