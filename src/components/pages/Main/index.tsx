import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { colors } from "../../../theme/colors";
import { Stack } from "../../shared/Stack";
import AddButton from "./AddButton";
import AddInput from "./AddInput";
import DateNavigator from "./DateNavigator";
import ProgressPercentage from "./ProgressPercentage";
import SelectFilter from "./SelectFilter";
import TodoItems from "./TodoItems";

export default function Main() {
  return (
    <Container>
      <DateNavigator />

      <SpaceBetween>
        <ProgressPercentage />

        <SelectFilter />
      </SpaceBetween>
      <StyledStack spacing={14} direction="column">
        <AddInput />

        <Suspense
          fallback={
            // Recoil은 기본적으로 Suspense를 지원하고 있기 때문에, 비동기 함수를 호출할 때 감싸주지 않으면 의도치 않게 에러가 발생할 수 있습니다.
            // 렌더링이 지연될 때 보여줄 UI를 fallback으로 넣어줍니다.
            <Skeleton
              count={3}
              height={32}
              baseColor={colors.gray[1]}
              highlightColor={colors.gray[0]}
            />
          }
        >
          <TodoItems />
        </Suspense>
      </StyledStack>
      <AddButton />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const StyledStack = styled(Stack)`
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`;

const SpaceBetween = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
