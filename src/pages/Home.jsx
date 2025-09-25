import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const getmonthlyData = (pivotDate, data) => {
  // 이번달의 시작점이 되는 시간값 필요
  const beginTime = new Date(
    pivotDate.getFullYear(), //해당 년도
    pivotDate.getMonth(),
    1, // 1일  (n월 1일, 0시0분0초가 시작임)
    0, // 시
    0, // 분
    0 // 초
  ).getTime(); // 숫자 크기 비교를 위해서 .getTime()을 붙임

  // 이번달의 끝이 되는 시간값 필요
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1, //ex)6월이라면 7월으로 지정, 7월의 0일 이면 6월의 마지막 날
    0, // 0일 지정 -> 해당하는 달의 이전 달의 마지막 날짜가 자동 설정됨
    23, // 시
    59, // 분
    59 // 초
  ).getTime();

  // 현재 pivotDate에 저장된 월에 해당하는 일기들만 필터링
  return data.filter(
    (item) => beginTime <= item.createDate && item.createDate <= endTime
  );
};

const Home = () => {
  // 컨텍스트에서 일기 데이터 가져오기
  const data = useContext(DiaryStateContext);
  usePageTitle("감정 일기장");
  // 오늘 날짜를 기준으로 화면에 표시,이전, 다음 버튼 클릭시 월이 변경되어야함
  // 버튼 클릭으로 변경되는 월 저장하는 state
  const [pivotDate, setPivotDate] = useState(new Date());

  // 특정 월에 해당하는 데이터만 필터링 getmonthlyData
  // pivotDate가 속한 "특정 월"의 데이터만 data에서 뽑아옴
  const monthlyData = getmonthlyData(pivotDate, data);
  // console.log(monthlyData);

  // 1. 이전 달
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  // 2. 다음 달
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  return (
    <div>
      {/*😘 1번 Header 컴퍼넌트 코드와 비교하며 확인 😘*/}
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      {/* props로 일기 데이터 전달 */}
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
