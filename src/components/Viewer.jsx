import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { emotionList } from "../util/constants";
// 이미지아이디와 내용을 받아서 상세보기 화면에 이미지와 내용을 띄움
const Viewer = ({ emotionId, content }) => {
  //emotionList에서 기존 일기의 이미지 사진 찾기
  // 해당 이미지가 들어있는 객체 반환하여 emotionItem에 담음
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        {/* emotionId에 따라 css className이 달라짐(동적으로 설정)
        이모지마다 배경색을 달리해야하기 때문  */}
        <div className={`emotion_img_wrapper emotion_${emotionId}`}>
          {/* emotionId를 통해 해당 이미지를 가져옴 */}
          <img src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
