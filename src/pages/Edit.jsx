import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const params = useParams();
  // useParams 훅을 사용하면 URL 경로에 있는 파라미터 값을 가져올 수 있다.
  // EX) /edit/3 -> param.id는 "3"반환
  const nav = useNavigate();

  //Edit 페이지의 경우 기존에 작성했던 일기 내용이 그대로 화면에 표시되어야함
  //따라서 기존의 일기 데이터에서 params의 id와 같은 id를 가진 일기객체 필요
  const data = useContext(DiaryStateContext);
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  usePageTitle(`${params.id}번 일기 수정`);
  //컴포넌트가 처음 렌더링될 때 params.id에 해당하는 데이터를 아직 불러오기 전이기 때문에
  // undefined이 나올 가능성 존재
  const curDiaryItem = useDiary(params.id);
  //이 줄이 실행될 때, params.id는 이미 있지만,
  //useDiary(id) 내부에서 데이터를 찾거나 불러오는 과정은 동기적으로 바로 값이 있는 게 아닐 수 있어.

  // undefined일 경우 대비 조건 코드 추가
  // 데이터가 준비되면 다시 렌더링되면서 아래 JSX가 실행될 수 있게 함.

  //이런 구조에서 자주 생기는 버그
  // useContext로 가져오는 데이터가 비동기 처리 후 업데이트되는데
  // 그걸 고려 안 하면 undefined로 접근해서 에러남
  if (!curDiaryItem) {
    return <div>데이터 로딩 중...🔍</div>;
  }

  //사용자가 url 주소로 일기를 찾으려고 할 경우
  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true }); //뒤로가기 방지 옵션 추가
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"< 뒤로 가기"}
          />
        }
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
      {/* initData === 변경될 예정인 기존의 일기 데이터 */}
    </div>
  );
};

export default Edit;
