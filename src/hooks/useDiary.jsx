import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

//useDiary 훅을 만든이유 : ID에 해당하는 특정 일기 객체 찾는 기능
// 리액트 훅은 무조건 컴포넌트 또는 같은 훅 내부에서만 사용 가능
const useDiary = (id) => {
  //iaryStateContext 안의 data는 초기에는 빈 배열이거나 아직 채워지지 않은 상태일 수 있음
  //그러면 아래 find()는 조건에 맞는 걸 못 찾고 undefined 반환
  const data = useContext(DiaryStateContext);

  const nav = useNavigate();

  // 특정 id에 해당하는 일기 객체를 담음(변동이 있을 예정인 일기 객체)
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    // id에 해당하는 특정 일기 객체 찾기

    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      // 명시적으로 브라우저의 전역 함수 사용 표시 window
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    setCurDiaryItem(currentDiaryItem);
  }, [id]); //의존성 배열(deps)에 id또는 data 값이 변경되면 useEffect 실행
  return curDiaryItem;
};
export default useDiary;
