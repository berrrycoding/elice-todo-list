import { useRecoilValue } from "recoil";
import { todoItemsProgressPercentageSelector } from "../../../../states/todoItems";

// 반복적으로 계산해야 하는 경우 -> 최적화 방법
// 1. percentage를 State로 선언하고, useEffect안에서 계산해준다.
// 2. useMemo(값을 저장했다가 필요할 때 계산 없이 바로 꺼내서 사용할 수 있는, 메모이제이션 방식으로 적용한 것)
//    useCallback(함수를 저장했다가 이후에 재활용할 수 있도록 하는 훅)
// 3. selector

export default function ProgressPercentage() {
  const progressPercentage = useRecoilValue(
    todoItemsProgressPercentageSelector
  );

  return <div style={{ padding: 20 }}>⛳️ 달성률 {progressPercentage}%</div>;
}
