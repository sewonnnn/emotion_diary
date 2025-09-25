import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  usePageTitle("새 일기 쓰기💕");

  const onSubmit = (input) => {
    onCreate(input.createDate.getiTme(), input.emotionId, input.content);
    // 새로운 일기 작성 시 Home 페이지로 이동해야함
    // 웹 브라우저의 뒤로가기 버튼 클릭시 새 일기 작성페이지로 이동하면 안됨(도배 가능성있음)
    // nav()에 두번째 인수로 뒤로가기 방지 옵션인 replace속성을 true로 적용해야함
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        //nav 객체에 -1을 매개변수로 전달시 페이지를 뒤로 이동시켜줌
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"< 뒤로 가기"}
          />
        }
      />
      {/* 👉🏻👉🏻Editor 컴포넌트는 Edit페이지에서도 사용됨.
      Edit페이지에서는 onUpdate함수가 수행되어야하고,
      New페이지에서는 onCreate함수가 수행되야함으로 이벤트 핸들러를
      props로 전달해야함 */}
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
