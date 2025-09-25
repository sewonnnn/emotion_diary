import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  // useParams => 브라우저에 명시한 URL 파라미터 값을 가져오는 기능
  // Params라는 변수에는 객체 저장(id라는 키에 대응되는 URL 주소 저장되어있음)
  const params = useParams();
  const nav = useNavigate();
  usePageTitle(`${params.id}번 일기💖`);

  const curDiaryItem = useDiary(params.id); // undefined이 나올 가능성 존재
  //useDiary에서 사용한 useEffect는 컴퍼넌트가 랜더링 된 이후에만 실행 되기 때문에
  console.log(curDiaryItem); // 맨 처음에 undefined 반환
  // undefined일 경우 대비 조건 코드 추가
  if (!curDiaryItem) {
    return <div>데이터 로딩 중...🔍</div>;
  }

  const { createDate, emotionId, content } = curDiaryItem;

  // getTime() -> Date() -> String
  const title = getStringDate(new Date(createDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"< 뒤로 가기"}
          ></Button>
        }
        rightChild={
          <Button
            onClick={() => {
              nav(`/edit/${params.id}`);
            }}
            text={"수정하기"}
          ></Button>
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
