import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Home 컴포넌트에서 전달한 특정 월에 해당하는 일기 props 전달 받기
const DiaryList = ({ data }) => {
  const nav = useNavigate(); //보통 useNavigate는 상단에 생성

  //select 태그의 옵션값을 저장하기 위한 state 선언
  const [sortType, setSortType] = useState("latest");
  // select 태그의 옵션 값이 바뀔 때마다 select 값도 변경되도록 처리
  const onChangeSortType = (event) => {
    setSortType(event.target.value);
  };

  //실제 정렬 기능 구현 함수
  const getSortedData = () => {
    // toSorted() : 원본 배열은 놔두고 정렬 후 새로운 배열 반환 함수
    // 단, data에 저장된 데이터가 객체 타입이기 때문에 단순 정렬이 아닌 직접 비교로 구현
    // prev, next는 data 배열 안에 있는 두 개의 일기 객체
    return data.toSorted((prev, next) => {
      if (sortType === "oldest") {
        // 오래된 날짜 순으로 정렬(과거 -> 최근)
        return Number(prev.createDate) - Number(next.createDate);
      } else {
        // 최신 날짜 순으로 정렬(최근 -> 과거)
        return Number(next.createDate) - Number(prev.createDate);
      }
    });
  };

  // 컴포넌트가 다시 호출될 때마다(리렌더링) 정렬 결과를 저장
  const sortedData = getSortedData();

  const goNewPage = () => {
    nav("./New");
  };

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={goNewPage} text={"새 일기 쓰기"} type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {/* 정렬된 배열 값을 사용해서 DiaryItem 컴포넌트에 추가 */}
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
