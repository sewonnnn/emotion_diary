import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { emotionList } from "../util/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStringDate } from "../util/get-stringed-date";

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();

  // 사용자의 입력한 여러개의 값을 관리하기 위한 state를 객체로 생성
  const [input, setInput] = useState({
    createDate: new Date(), // 날짜
    emotionId: 3, // 감정
    content: "", // 일기내용
  });

  useEffect(() => {
    //initData가 존재하면(= 수정 모드일 경우)  Edit페이지에서 curDiaryItem(사용자가 수정하고자하는 기존의 일기 데이터)넘겨줌
    //initData를 기반으로 input 상태값을 설정해야함

    //initData
    if (initData) {
      setInput({ ...initData, createDate: new Date(initData.createDate) });
    }
  }, [initData]); //수정모드일 때 딱 한번만 기존의 내용을 가져옴
  // 객체를 문자열로 변환

  // 사용자의 입력 값이 변경될 때마다 state 값을 업데이트
  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    // 날짜 변경시 Date 객체가 아닌 문자열이 반환되므로
    if (name === "createDate") {
      value = new Date(value);
      // 문자열을 Date 객체로 변환해야함
      // 👉 나중에 날짜 비교/정렬하려면 Date 객체가 있어야 하기 때문!
    }
    setInput({
      ...input, //기존의 input 스테이트 값 유지 (emotionId, content)
      // 현재 입력이 발생한 태그의 name을 input스테이트의 key값으로 활용
      // 현재 입력이 발생한 태그의 value를 위에서 찾은 key에 대응되는 값으로 활용
      [name]: value,
    });
  };

  // 아래의 input 태그가 아님 state의 input임
  const onSubmitButtonClick = () => {
    onSubmit(input);
  };
  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createDate"
          value={getStringDate(input.createDate)}
          onChange={onChangeInput}
          type="date" //달력 선택 폼
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_wrapper">
          {/*
          감정이 추가되거나 수정되면 코드를 변경하기 불편함.
          또 감정 선택시 onClick 이벤트 처리도 동일 함수를 감정마다 작성해야함. (비효율적)
          따라서 데이터를 저장할 배열을 사용하는 것이 좋음.
          <EmotionItem emotionId={1} emotionName={"완전 좋음"}isSelected={true}/>
          <EmotionItem emotionId={2} emotionName={"좋음"} />
          <EmotionItem emotionId={3} emotionName={"그럭저럭"} />
          <EmotionItem emotionId={4} emotionName={"나쁨"} />
          <EmotionItem emotionId={5} emotionName={"끔찍함"} />
          */}

          {emotionList.map((item) => (
            // 직접 만든 컴포넌트의 경우 이벤트 객체를 직접 생성해서 전달해야함
            // (컴포넌트는 이벤트 객체가 자동으로 전달 X)
            <EmotionItem
              // onClick이라는 props를 EmotionItem 컴포넌트에게 전달
              // onClick는 이벤트 x, props임!!
              onClick={() =>
                onChangeInput({
                  //onChangeInput에서 target을 이용하여 name과 value를 찾음
                  //그렇기 때문에 여기서도 target과 name, value를 활용해야함
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        {/* 페이지 뒤로가기 구현 */}
        <Button
          onClick={() => {
            nav(-1);
          }}
          text={"취소하기"}
        />
        <Button
          onClick={onSubmitButtonClick}
          //작성완료 버튼은 수정페이지에서 눌렀는지, 새페이지에서 눌렀는지 구분해야함
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
