import addDays from "date-fns/addDays";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentDateAtom } from "../../../../states/todoItems";
import { colors } from "../../../../theme/colors";
import { TextCenter } from "../../../shared/TextCenter";

export default function DateNavigator() {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateAtom);

  function handleMoveNextDate() {
    // 현재 날짜보다 하루 뒤. +1 -> 그걸 setCurrentDate에 적용해주기
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
  }

  function handleMovePreviousDate() {
    const newDate = subDays(currentDate, 1);
    setCurrentDate(newDate);
  }

  return (
    <Container>
      <div onClick={handleMovePreviousDate} className="move-button">
        <FiChevronLeft size={25} />
      </div>
      <TextCenter>
        <div className="date-big-font">{format(currentDate, "MM월 dd일")}</div>
        <div className="date-normal-font">{format(currentDate, "yyyy년")}</div>
      </TextCenter>
      <div onClick={handleMoveNextDate} className="move-button">
        <FiChevronRight size={25} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .move-button {
    padding: 10px;
  }

  .date-big-font {
    font-size: 24px;
    font-weight: bold;
  }

  .date-normal-font {
    color: ${colors.gray[1]};
  }
`;
