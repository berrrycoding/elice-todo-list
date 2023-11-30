import { ChangeEvent } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { filterAtom } from "../../../../states/todoItems";
import { colors } from "../../../../theme/colors";
import { FilterType } from "../../../../types";

// filter를 change하고 보여주는 컴포넌트
export default function SelectFilter() {
  const [filter, setFilter] = useRecoilState(filterAtom);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value as FilterType);
  }

  return (
    <Container>
      <StyledSelect value={filter} onChange={(e) => handleChange(e)}>
        <option value="all">전체</option>
        <option value="done">완료</option>
        <option value="not yet">미완료</option>
      </StyledSelect>
      <FiChevronDown color={colors.white} size={14} />
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid ${colors.gray[0]};
  border-radius: 20px;
  width: fit-content;
  padding: 4px 8px;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled.select`
  border: none;
  background: none;
  color: ${colors.white};
  appearance: none;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  :focus {
    outline: none;
  }

  option {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
