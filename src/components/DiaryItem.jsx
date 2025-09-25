import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

// props 값을 받기 위해서 구조분해 할당을 사용
const DiaryItem = ({ id, createDate, emotionId, content }) => {
  const nav = useNavigate(); //실제로 페이지 이동시키는 기능을 가진 함수 저장(함수도 객체임)

  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div onClick={goDiaryPage} className={`img_section emotion_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} />
      </div>

      <div onClick={goDiaryPage} className="info_section">
        <div className="create_date">
          {new Date(createDate).toLocaleDateString()}
        </div>
        <div className="contente">{content}</div>
      </div>

      <div onClick={goEditPage} className="button_section">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
